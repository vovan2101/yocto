const puppeteer = require('puppeteer');
const path = require('path');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillSpatialCapitalForm = async (formData) => {
    if (!formData) {
        console.error('No form data received');
        return;
    }

    const MAX_ATTEMPTS = 6;
    let attempt = 0;
    let success = false;
    let browser;
    let page;
    let frame;

    while (!success && attempt < MAX_ATTEMPTS) {
        attempt++;

        if (attempt > 1) {
            // Отправляем сообщение о повторной попытке
            broadcast({
                investor: 'Spatial Capital',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Spatial Capital form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({ 
                headless: true, 
                args: ['--no-sandbox', '--disable-setuid-sandbox'], 
                executablePath: '/usr/bin/google-chrome-stable' 
            });
            page = await browser.newPage();
            await page.goto('https://www.spatial.capital/application', { waitUntil: 'networkidle2' });

            await page.waitForSelector('iframe[src*="https://form.typeform.com/to/Vxogdr6W"]');

            const iframeElement = await page.$('iframe[src*="https://form.typeform.com/to/Vxogdr6W"]');
            frame = await iframeElement.contentFrame();

            // Нажатие на кнопку "Continue"
            await new Promise(resolve => setTimeout(resolve, 2500));
            await frame.waitForSelector('.ButtonWrapper-sc-__sc-1qu8p4z-0.fDeDDh');
            await frame.click('.ButtonWrapper-sc-__sc-1qu8p4z-0.fDeDDh');

            // Заполнение текстового поля (company name)
            await new Promise(resolve => setTimeout(resolve, 2500));
            const companyNameInput = await frame.waitForSelector('input[type="text"][placeholder="Type your answer here..."]');
            await companyNameInput.type(formData.company_name);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля для "Short Answer" (company website)
            try {
                // Ожидание и поиск текстового поля для "Short Answer" (company website)
                await new Promise(resolve => setTimeout(resolve, 2500));
                const websiteInput = await frame.waitForSelector('input[type="url"][placeholder="https://"]', { timeout: 5000 });
                if (websiteInput) {
                    await websiteInput.type(formData.company_website);
                    await page.keyboard.press('Enter');
                }
            } catch (error) {
                console.log('Element not found, pressing Enter as fallback.');
                await page.keyboard.press('Enter');
            }
            

            // Заполнение текстового поля для "Short Answer" (company LinkedIn)
            try {
                // Заполнение текстового поля для "Short Answer" (company LinkedIn)
                await new Promise(resolve => setTimeout(resolve, 2500));
                const linkedinInput = await frame.waitForSelector('input[type="url"][placeholder="https://linkedin.com"]', { timeout: 5000 });
                if (linkedinInput) {
                    await linkedinInput.type(formData.company_linkedin);
                    await page.keyboard.press('Enter');
                }
            } catch (error) {
                console.log('LinkedIn input field not found, pressing Enter as fallback.');
                await page.keyboard.type(formData.company_linkedin); // Печатает текст напрямую
                await page.keyboard.press('Enter'); // Нажимает Enter как резервное действие
            }
            
            // Заполнение текстового поля (one-line description)
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.type(formData.one_line_description);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля (first and last name)
            try {
                await new Promise(resolve => setTimeout(resolve, 2500));
                const nameInput = await frame.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 5000 }); // Уточните селектор
                if (nameInput) {
                    await nameInput.type(`${formData.first_name} ${formData.last_name}`);
                }
            } catch (error) {
                console.log('Name input field not found, typing directly and pressing Enter.');
                await page.keyboard.type(`${formData.first_name} ${formData.last_name}`);
            }
            await page.keyboard.press('Enter');
            
            // Заполнение текстового поля (email)
            try {
                await new Promise(resolve => setTimeout(resolve, 2500));
                const emailInput = await frame.waitForSelector('input[placeholder="Enter your email"]', { timeout: 5000 }); // Уточните селектор
                if (emailInput) {
                    await emailInput.type(formData.email);
                }
            } catch (error) {
                console.log('Email input field not found, typing directly and pressing Enter.');
                await page.keyboard.type(formData.email);
            }
            await page.keyboard.press('Enter');
            

            // Выбор варианта "Yes"
            try {
                // Выбор варианта "Yes"
                await new Promise(resolve => setTimeout(resolve, 2500));
                await frame.waitForSelector('div[role="radio"]', { timeout: 5000 });
                await frame.evaluate(() => {
                    const yesOption = Array.from(document.querySelectorAll('div[role="radio"]')).find(el => el.innerText.includes('Yes'));
                    if (yesOption) {
                        yesOption.click();
                    }
                });
            
                // Нажатие на кнопку "Continue"
                await new Promise(resolve => setTimeout(resolve, 2500));
                await page.keyboard.press('Enter');
            
                // Выбор варианта для pitch_deck
                await new Promise(resolve => setTimeout(resolve, 2500));
                if (formData.pitch_deck) {
                    try {
                        await frame.waitForSelector('li[aria-label*="Yes - a deck link"]', { timeout: 5000 });
                        await frame.evaluate(() => {
                            const linkOption = Array.from(document.querySelectorAll('li[aria-label*="Yes - a deck link"]')).find(el => el);
                            if (linkOption) {
                                linkOption.querySelector('div[role="radio"]').click();
                            }
                        });
            
                        // Вставка ссылки на pitch_deck
                        await new Promise(resolve => setTimeout(resolve, 2500));
                        const deckLinkInput = await frame.waitForSelector('input[type="url"][placeholder="https://"]', { timeout: 5000 });
                        if (deckLinkInput) {
                            await deckLinkInput.type(formData.pitch_deck);
                        }
                    } catch (error) {
                        console.log('Deck link input field or option not found, typing directly and pressing Enter.');
                        await page.keyboard.type(formData.pitch_deck);
                    }
                    await page.keyboard.press('Enter');
                } else if (formData.pitch_deck_file) {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 2500));
                        await frame.waitForSelector('li[aria-label*="Yes - a deck file"]', { timeout: 5000 });
                        await frame.evaluate(() => {
                            const fileOption = Array.from(document.querySelectorAll('li[aria-label*="Yes - a deck file"]')).find(el => el);
                            if (fileOption) {
                                fileOption.querySelector('div[role="radio"]').click();
                            }
                        });
            
                        // Загрузка файла
                        await new Promise(resolve => setTimeout(resolve, 2500));
                        const fileInputSelector = 'input[type="file"]';
                        const fileInput = await frame.$(fileInputSelector);
            
                        if (fileInput) {
                            const absoluteFilePath = path.resolve(__dirname, '..', formData.pitch_deck_file);
                            await fileInput.uploadFile(absoluteFilePath);
                            await new Promise(resolve => setTimeout(resolve, 2500)); // ожидание обработки файла
                        } else {
                            console.log('File input field not found, skipping file upload.');
                        }
                    } catch (error) {
                        console.log('Error processing file upload or selecting option.');
                    }
                } else {
                    // Если нет ни ссылки, ни файла, выбираем вариант "No"
                    try {
                        await new Promise(resolve => setTimeout(resolve, 2500));
                        await frame.waitForSelector('li[aria-label*="No"]', { timeout: 5000 });
                        await frame.evaluate(() => {
                            const noOption = Array.from(document.querySelectorAll('li[aria-label*="No"]')).find(el => el);
                            if (noOption) {
                                noOption.querySelector('div[role="radio"]').click();
                            }
                        });
            
                        // Нажатие на кнопку "Continue"
                        await new Promise(resolve => setTimeout(resolve, 2500));
                        const continueButton = await frame.waitForSelector('.ButtonWrapper-sc-__sc-1qu8p4z-0.fDeDDh', { timeout: 5000 });
                        if (continueButton) {
                            await continueButton.click();
                        } else {
                            console.log('Continue button not found, pressing Enter.');
                            await page.keyboard.press('Enter');
                        }
                    } catch (error) {
                        console.log('Error selecting "No" option or pressing Continue.');
                    }
                }
            } catch (error) {
                console.log('Unexpected error occurred in the script:', error);
            }
            

            // Заполнение текстового поля (raising amount)
            try {
                // Заполнение текстового поля (raising amount)
                await new Promise(resolve => setTimeout(resolve, 2500));
                const raisingAmountInput = await frame.waitForSelector('input[type="text"][placeholder="Type your answer here..."]', { timeout: 5000 });
                if (raisingAmountInput) {
                    await raisingAmountInput.type(formData.raising_amount);
                } else {
                    console.log('Raising amount input field not found, typing directly and pressing Enter.');
                    await page.keyboard.type(formData.raising_amount);
                }
            } catch (error) {
                console.log('Error finding raising amount input field, typing directly and pressing Enter.');
                await page.keyboard.type(formData.raising_amount);
            }
            await page.keyboard.press('Enter');
            

            // Нажатие на кнопку "Continue"
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.press('Enter');

            // Нажатие на кнопку "Submit"
            await new Promise(resolve => setTimeout(resolve, 2500));
            const submitButtonSelector = 'button[data-qa="submit-button deep-purple-submit-button"]';
            await frame.waitForSelector(submitButtonSelector);
            const submitButton = await frame.$(submitButtonSelector);
            await submitButton.click();

            try {
                await frame.waitForFunction(() => {
                    // Проверяем, что кнопка "Submit" исчезла, что указывает на изменение страницы
                    return !document.querySelector('button[data-qa="submit-button deep-purple-submit-button"]');
                }, { timeout: 4000 });

                console.log('Spatial Capital form submitted successfully');
                broadcast({
                    investor: 'Spatial Capital',
                    status: 'received',
                });
                success = true;
            } catch (error) {
                console.error('Ошибка после отправки формы:', error);
                throw new Error('Spatial Capital form submission failed: no changes detected after submission');
            }

        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Spatial Capital',
                status: 'received',
            });

            if (attempt >= MAX_ATTEMPTS) {
                console.error('Достигнуто максимальное количество попыток.');
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
            frame = null;
            page = null;
            browser = null;
        }
    }
};

module.exports = fillSpatialCapitalForm;