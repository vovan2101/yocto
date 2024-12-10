const puppeteer = require('puppeteer');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillWischoffForm = async (formData) => {
    if (!formData) {
        console.error('No form data received');
        return;
    }

    const MAX_ATTEMPTS = 3;
    let attempt = 0;
    let success = false;
    let browser;
    let page;

    while (!success && attempt < MAX_ATTEMPTS) {
        attempt++;

        if (attempt > 1) {
            // Отправляем сообщение о повторной попытке
            broadcast({
                investor: 'Wischoff Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Wischoff Ventures form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            page = await browser.newPage();
            await page.goto('https://airtable.com/appl0n7pzw0060tns/shr28rdgNSzNC7ioU', { waitUntil: 'networkidle2' });

            const cookieCloseButtonSelector = '.onetrust-close-btn-handler';
            const cookieCloseButton = await page.$(cookieCloseButtonSelector);
            if (cookieCloseButton) {
                await cookieCloseButton.click();
            }

            await page.waitForSelector('.formFieldAndSubmitContainer');

            const inputSelectors = [
                '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(1) input', // company_name
                '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(6) input', // email
            ];

            const inputFields = await Promise.all(inputSelectors.map(selector => page.$(selector)));

            for (let i = 0; i < inputFields.length; i++) {
                const field = inputFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = formData.company_name;
                        break;
                    case 1:
                        value = formData.email;
                        break;
                }

                if (field && value) {
                    await field.click({ clickCount: 3 });
                    await field.type(value);
                }
            }

            // Обработка выпадающих списков
            const dropdownSelectors = [
                '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(2) [data-testid="autocomplete-button"]', // industry
                '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(3) [data-testid="autocomplete-button"]', // location
                '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(4) [data-testid="autocomplete-button"]', // stage
            ];

            const dropdownFields = await Promise.all(dropdownSelectors.map(selector => page.$(selector)));

            for (let i = 0; i < dropdownFields.length; i++) {
                const field = dropdownFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = 'Other'; // По умолчанию выбираем 'Other'
                        const industries = formData.industryString.split('; ');

                        for (let industry of industries) {
                            if (industry === 'FinTech') {
                                value = formData.fintech_type;
                                break;
                            } else if (industry === 'Cloudtech and DevOps') {
                                value = 'Cloud infrastructure';
                                break;
                            } else if (['Enterprise', 'Consumer', 'Vertical Saas', 'Cloud Infrastructure', 'B2B Marketplace', 'Healthcare'].includes(industry)) {
                                value = industry;
                                break;
                            }
                        }
                        break;
                    case 1:
                        value = formData.headquartered;
                        value = value === 'US' ? 'US' : 'International';
                        break;
                    case 2:
                        value = formData.raising_round;
                        if (value === 'Pre-Seed' || value === 'Pre-Seed extension') {
                            value = 'Pre-seed';
                        } else if (value === 'Seed' || value === 'Seed extension') {
                            value = 'Seed';
                        } else if (value === 'Series A') {
                            value = 'Series A';
                        } else {
                            value = formData.beyond_series_a_round;
                        }
                        break;
                }

                if (field && value) {
                    try {
                        await field.click();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await page.keyboard.type(value);
                        await page.keyboard.press('Enter');
                    } catch (error) {
                        console.error(`Error handling dropdown field ${i}:`, error);
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            const attachmentSelector = '.formFieldAndSubmitContainer .sharedFormField:nth-of-type(5) [role="button"]';
            const urlButtonSelector = '#uppy-uploader-sidenav-child-url';
            const urlInputSelector = 'input[data-testid="urlInput"]';
            const submitUrlButtonSelector = 'button[data-testid="submitUrlButton"]';
            const uploadButtonSelector = 'button[data-testid="upload-button"]';
            const closeModalButtonSelector = 'div[aria-label="Close dialog"]';

            await new Promise(resolve => setTimeout(resolve, 4000));
            if (formData.pitch_deck && formData.pitch_deck.trim() !== '') {
                await page.waitForSelector(attachmentSelector);
                const attachButton = await page.$(attachmentSelector);
                if (attachButton) {
                    await attachButton.click();

                    await page.waitForSelector(urlButtonSelector, { visible: true });
                    const urlButton = await page.$(urlButtonSelector);
                    if (urlButton) {
                        await urlButton.click();
                        await page.waitForSelector(urlInputSelector, { visible: true });
                        const urlInput = await page.$(urlInputSelector);
                        if (urlInput) {
                            await urlInput.type(formData.pitch_deck);
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            const submitUrlButton = await page.$(submitUrlButtonSelector);
                            if (submitUrlButton) {
                                await submitUrlButton.click();
                                await new Promise(resolve => setTimeout(resolve, 5000));

                                const errorSelector = '.ui-state-error-text';
                                const isError = await page.$(errorSelector);
                                if (isError) {
                                    console.log('URL not accepted, closing modal and continuing.');
                                    const closeModalButton = await page.$(closeModalButtonSelector);
                                    if (closeModalButton) {
                                        await closeModalButton.click();
                                    }
                                } else {
                                    await page.waitForSelector(uploadButtonSelector, { visible: true });
                                    const uploadButton = await page.$(uploadButtonSelector);
                                    if (uploadButton) {
                                        await uploadButton.click();
                                        await new Promise(resolve => setTimeout(resolve, 2000));
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                console.log('No pitch_deck provided, skipping attachment field.');
            }

            // После обработки вложения, прокручиваем страницу к кнопке отправки
            const submitButtonSelector = 'input[type="button"].submitButton';

            await page.waitForSelector(submitButtonSelector);

            await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, submitButtonSelector);

            await page.waitForSelector(submitButtonSelector, { visible: true });

            await page.waitForFunction((selector) => {
                const button = document.querySelector(selector);
                if (!button) return false;
                const rect = button.getBoundingClientRect();
                const elementAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
                return button === elementAtPoint;
            }, {}, submitButtonSelector);

            // Теперь можно безопасно нажать на кнопку отправки
            // await page.click(submitButtonSelector);

            // Ожидание появления текста после отправки формы
            try {
                await page.waitForFunction(() => {
                    return document.body.innerText.includes("You'll be redirected to https://wischoff.com in a few seconds.");
                }, { timeout: 5000 });

                console.log('Wischoff Ventures form submitted successfully and redirect message detected.');
                broadcast({
                    investor: 'Wischoff Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } catch (e) {
                console.error('Expected redirect message not found after form submission:', e);
                throw new Error('Wischoff Ventures form submission failed: expected redirect message not detected');
            }
        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Wischoff Ventures',
                status: 'error',
                message: 'An error occurred while sending the form',
                attempt: attempt,
            });

            if (attempt >= MAX_ATTEMPTS) {
                console.error('Достигнуто максимальное количество попыток.');
                // Здесь можно отправить финальное сообщение об ошибке, если требуется
            } else {
                // Задержка перед повторной попыткой
                const delay = attempt * 1000;
                console.log(`Повторная попытка через ${delay / 1000} секунд...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        } finally {
            if (browser) {
                await browser.close();
            }
            page = null;
            browser = null;
        }
    }
};

module.exports = fillWischoffForm;
