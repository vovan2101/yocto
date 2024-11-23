// pathvcForm.js

const puppeteer = require('puppeteer');
const { broadcast } = require('../src/app');

const fillPathvcForm = async (formData) => {
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
                investor: 'Path Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Path VC form with data (Attempt ${attempt}):`, formData);

            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            const page = await browser.newPage();
            await page.goto('https://www.path.vc/form', { waitUntil: 'networkidle2' });

            // Подождите, пока элементы формы не загрузятся
            await page.waitForSelector('input[name="Founder-Name"]');

            // Заполнение полей формы
            await page.type('input[name="Founder-Name"]', formData.first_name);
            await page.type('input[name="Founder-Name-2"]', formData.last_name);
            await page.type('input[name="E-mail-Address"]', formData.email);
            await page.type('input[name="Founder-LinkedIn"]', formData.ceo_linkedin);
            await page.type('input[name="Company-Name"]', formData.company_name);
            await page.type('input[name="One-line-Description"]', formData.company_description);
            await page.type('input[name="url"]', formData.company_website);

            // Установка значения для сектора
            const industryMapping = {
                'AI / ML': 'Another option',
                'Real Estate / Housing': 'Property Tech',
                'Legal / government / regulation': 'Legal Tech',
                'Fin Tech': 'Financial Tech'
            };

            let selectedIndustryValue = 'Other';
            for (let industry of formData.industryString.split('; ')) {
                if (industryMapping[industry]) {
                    selectedIndustryValue = industryMapping[industry];
                    break;
                }
            }

            await page.select('select[name="Sector"]', selectedIndustryValue);

            await page.type('input[name="Video-pitch-URL"]', formData.founder_video_url);
            await page.type('input[name="Pitch-Deck-URL"]', formData.pitch_deck);

            // Отправка формы
            // await page.click('input[type="submit"]');
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Ожидание скрытия формы и появления сообщения об успехе
            try {
                await page.waitForFunction(() => {
                    const form = document.querySelector('form#wf-form-Entry-Form');
                    const successMessage = document.querySelector('.success-message.w-form-done');
                    return form && successMessage &&
                        window.getComputedStyle(form).display === 'none' &&
                        window.getComputedStyle(successMessage).display === 'block';
                }, { timeout: 5000 });

                console.log('Path VC form submitted successfully');
                broadcast({
                    investor: 'Path Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } catch (e) {
                console.error('Не удалось определить успешную отправку формы:', e);
                throw new Error('Не удалось отправить форму Path VC: сообщение об успехе не отображается');
            }

        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Path Ventures',
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
            // Закрываем браузер после каждой попытки
            if (browser) {
                await browser.close();
            }
        }
    }
};

module.exports = fillPathvcForm;
