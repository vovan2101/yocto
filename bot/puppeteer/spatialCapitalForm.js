const puppeteer = require('puppeteer');
const path = require('path');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillSpatialCapitalForm = async (formData) => {
    if (!formData) {
        console.error('No form data received');
        return;
    }

    const MAX_ATTEMPTS = 3;
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
            await new Promise(resolve => setTimeout(resolve, 2500));
            const websiteInput = await frame.waitForSelector('input[type="url"][placeholder="https://"]');
            await websiteInput.type(formData.company_website);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля для "Short Answer" (company LinkedIn)
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.type(formData.company_linkedin);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля (one-line description)
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.type(formData.one_line_description);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля (first and last name)
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.type(`${formData.first_name} ${formData.last_name}`);
            await page.keyboard.press('Enter');

            // Заполнение текстового поля (email)
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.type(formData.email);
            await page.keyboard.press('Enter');

            // Выбор варианта "Yes"
            await new Promise(resolve => setTimeout(resolve, 2500));
            await frame.waitForSelector('div[role="radio"]');
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
                // Если есть ссылка на pitch_deck, выбираем вариант "Yes - a deck link"
                await frame.waitForSelector('li[aria-label*="Yes - a deck link"]');
                await frame.evaluate(() => {
                    const linkOption = Array.from(document.querySelectorAll('li[aria-label*="Yes - a deck link"]')).find(el => el);
                    if (linkOption) {
                        linkOption.querySelector('div[role="radio"]').click();
                    }
                });

                // Вставка ссылки на pitch_deck
                await new Promise(resolve => setTimeout(resolve, 2500));
                const deckLinkInput = await frame.waitForSelector('input[type="url"][placeholder="https://"]');
                await deckLinkInput.type(formData.pitch_deck);
                await page.keyboard.press('Enter');

            } else if (formData.pitch_deck_file) {
                // Если есть файл pitch_deck, выбираем вариант "Yes - a deck file"
                await new Promise(resolve => setTimeout(resolve, 2500));
                await frame.waitForSelector('li[aria-label*="Yes - a deck file"]');
                await frame.evaluate(() => {
                    const fileOption = Array.from(document.querySelectorAll('li[aria-label*="Yes - a deck file"]')).find(el => el);
                    if (fileOption) {
                        fileOption.querySelector('div[role="radio"]').click();
                    }
                });

                // Загрузка файла с использованием абсолютного пути
                await new Promise(resolve => setTimeout(resolve, 2500));
                const fileInputSelector = 'input[type="file"]';
                const fileInput = await frame.$(fileInputSelector);

                if (fileInput) {
                    const absoluteFilePath = path.resolve(__dirname, '..', formData.pitch_deck_file);
                    await fileInput.uploadFile(absoluteFilePath);
                    await new Promise(resolve => setTimeout(resolve, 2500)); // ожидание обработки файла
                }

            } else {
                // Если нет ни ссылки, ни файла, выбираем вариант "No"
                await new Promise(resolve => setTimeout(resolve, 2500));
                await frame.waitForSelector('li[aria-label*="No"]');
                await frame.evaluate(() => {
                    const noOption = Array.from(document.querySelectorAll('li[aria-label*="No"]')).find(el => el);
                    if (noOption) {
                        noOption.querySelector('div[role="radio"]').click();
                    }
                });

                // Нажатие на кнопку "Continue"
                await new Promise(resolve => setTimeout(resolve, 2500));
                await frame.waitForSelector('.ButtonWrapper-sc-__sc-1qu8p4z-0.fDeDDh');
                await frame.click('.ButtonWrapper-sc-__sc-1qu8p4z-0.fDeDDh');
            }

            // Заполнение текстового поля (raising amount)
            await new Promise(resolve => setTimeout(resolve, 2500));
            const raisingAmountInput = await frame.waitForSelector('input[type="text"][placeholder="Type your answer here..."]');
            await raisingAmountInput.type(formData.raising_amount);
            await page.keyboard.press('Enter');

            // Нажатие на кнопку "Continue"
            await new Promise(resolve => setTimeout(resolve, 2500));
            await page.keyboard.press('Enter');

            // Нажатие на кнопку "Submit"
            await new Promise(resolve => setTimeout(resolve, 2000));
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
                status: 'error',
                message: 'An error occurred while sending the form',
                attempt: attempt,
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
