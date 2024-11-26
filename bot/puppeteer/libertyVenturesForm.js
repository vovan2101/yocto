const puppeteer = require('puppeteer');
const path = require('path'); // Для загрузки файла
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillLibertyVenturesForm = async (formData) => {
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
                investor: 'Liberty Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Liberty Ventures form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            page = await browser.newPage();
            await page.goto('https://share.hsforms.com/1DHSuFcRRQTGI5MLAO8Pa6Aqg7u9', { waitUntil: 'networkidle2' });

            // Заполнение полей текстового ввода
            await page.type('#company-input', formData.company_name); // Startup Name
            await page.type('#company_website-input', formData.company_website); // Website
            await page.type('#description_one_line-input', formData.one_line_description); // One Line Description
            await page.type('#firstname-input', formData.first_name); // First Name
            await page.type('#lastname-input', formData.last_name); // Last Name
            await page.type('#phone-input', formData.phone_number); // Phone Number
            await page.type('#email-input', formData.email); // Email
            await page.type('#linkedin_url-input', formData.ceo_linkedin); // LinkedIn URL

            // Выбор значения в выпадающем списке (Company Industry)
            await page.select('select[id="0-2/company_industry-input"]', formData.liberty_ventures_industry);

            // Заполнение текстового поля для вопроса о ценностях
            await page.type('#how_do_the_values_of_your_team_align_with_those_of_liberty_ventures_-input', formData.value_of_team);

            // Загрузка файла (Pitch Deck)
            if (formData.pitch_deck_file && formData.pitch_deck_file.trim() !== '') {
                const fileInput = await page.$('#pitch_deck-input');
                const filePath = path.resolve(formData.pitch_deck_file); // Полный путь к файлу
                await fileInput.uploadFile(filePath);
            } else {
                console.log('No pitch_deck_file provided, skipping file upload.');
            }

            // Заполнение поля "How did you find out about us?"
            await page.select('#how_did_you_find_out_about_us_-input', "Search Engine");

            // Небольшая задержка перед отправкой формы
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Нажимаем кнопку Submit
            // await page.click('button[type="submit"]');

            // Ожидание появления подтверждающего сообщения после отправки формы
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                await page.waitForFunction(() => {
                    return document.body.innerText.includes('Thanks for submitting the form.');
                }, { timeout: 5000 });

                console.log('Liberty Ventures form submitted successfully');
                broadcast({
                    investor: 'Liberty Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } catch (e) {
                console.error('Confirmation message not detected:', e);
                throw new Error('Liberty Ventures form submission failed: confirmation message not detected');
            }
        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Liberty Ventures',
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

module.exports = fillLibertyVenturesForm;
