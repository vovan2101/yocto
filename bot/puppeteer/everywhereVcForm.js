const puppeteer = require('puppeteer');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillEverywhereVcForm = async (formData) => {
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
                investor: 'Everywhere Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Everywhere Ventures form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({ 
                headless: true, 
                args: ['--no-sandbox', '--disable-setuid-sandbox'], 
                executablePath: '/usr/bin/google-chrome-stable' 
            });
            page = await browser.newPage();
            await page.goto('https://everywhere.vc', { waitUntil: 'networkidle2' });

            // Даем время странице загрузиться
            await new Promise(resolve => setTimeout(resolve, 9000));

            // Прокручиваем страницу до конца, чтобы загрузить все элементы
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    let distance = 500;
                    let timer = setInterval(() => {
                        let scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });

            // Кликаем по ссылке для открытия формы
            await page.evaluate(() => {
                const link = document.querySelector('[data-open-contacts]');
                if (link) {
                    link.click();
                } else {
                    console.error('Link not found');
                }
            });

            // Ждем открытия формы
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Закрываем окно с куки (если есть)
            const cookieCloseButtonSelector = '.cookie-consent-close';
            const cookieCloseButton = await page.$(cookieCloseButtonSelector);
            if (cookieCloseButton) {
                await cookieCloseButton.click();
            }

            // Переключение на iframe с формой
            const frameHandle = await page.$('iframe[data-tally-src]');
            frame = await frameHandle.contentFrame();

            if (!frame) {
                throw new Error('Form frame not found');
            }

            // Список селекторов для полей ввода
            const inputSelectors = [
                'input[id="5245d670-541b-4356-8956-83cfe98b7943"]', // Name
                'input[id="c49695c3-fa46-4ab4-8215-39ed11410ca3"]', // Email
                'input[id="b4227ff0-989f-4cb1-be3d-0cd6523b7efc"]', // Linkedin
                'input[id="41374a67-e3f7-49cc-81af-065142a8629d"]', // Location
                'input[id="b9dca931-b4c7-4229-a09b-b71e34229fc8"]', // Company Name
                'input[id="ba17fa70-c769-40c8-b21b-41f227ffe8b9"]', // Company Website
                'input[id="64371833-2b47-4552-b9f3-a681b586f4f8"]'  // Investor Deck Link
            ];

            const inputFields = await Promise.all(inputSelectors.map(selector => frame.$(selector)));

            for (let i = 0; i < inputFields.length; i++) {
                const field = inputFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = `${formData.first_name} ${formData.last_name}`;
                        break;
                    case 1:
                        value = formData.email;
                        break;
                    case 2:
                        value = formData.ceo_linkedin;
                        break;
                    case 3:
                        if (formData.specific_location === 'San Francisco / Bay Area') {
                            value = 'San Francisco, USA';
                        } else if (formData.specific_location === 'New York') {
                            value = 'New York, USA';
                        } else if (formData.specific_location === 'Boston') {
                            value = 'Boston, USA';
                        } else if (formData.specific_location === 'Los Angeles') {
                            value = 'Los Angeles, USA';
                        } else if (formData.specific_location === 'Austin') {
                            value = 'Austin, USA';
                        } else if (formData.specific_location === 'Denver') {
                            value = 'Denver, USA';
                        } else if (formData.specific_location === 'Utah') {
                            value = 'Salt Lake City, USA';
                        } else if (formData.specific_location === 'Chicago') {
                            value = 'Chicago, USA';
                        } else if (formData.specific_location === 'Seattle') {
                            value = 'Seattle, USA';
                        } else if (formData.specific_location === 'Atlanta') {
                            value = 'Atlanta, USA';
                        } else if (formData.specific_location === 'Philadelphia') {
                            value = 'Philadelphia, USA';
                        } else if (['US - Other', 'Canada - Other', 'Latin America', 'Europe', 'Asia - India', 'Asia - Other', 'Africa'].includes(formData.specific_location)) {
                            value = formData.other_specific_location;
                        } else if (formData.specific_location === 'Toronto') {
                            value = 'Toronto, Canada';
                        } else if (formData.specific_location === 'Montreal') {
                            value = 'Montreal, Canada';
                        } else {
                            value = formData.specific_location;
                        }
                        break;
                    case 4:
                        value = formData.company_name;
                        break;
                    case 5:
                        value = formData.company_website;
                        break;
                    case 6:
                        value = formData.pitch_deck;
                        break;
                }

                if (field && value) {
                    await field.click({ clickCount: 3 });
                    await field.type(value);
                }
            }

            // Ожидание перед отправкой формы
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Нажатие на кнопку отправки формы
            await frame.click('button[type="submit"]');

            // Ожидание появления текста "Thank you" внутри фрейма
            try {
                await frame.waitForFunction(() => {
                    return document.body.innerText.includes("Thank you");
                }, { timeout: 5000 });
            
                console.log("Everywhere Ventures form submitted successfully");
                broadcast({
                    investor: 'Everywhere Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                throw new Error('Everywhere Ventures form submission failed: "Thank you" message not found');
            }
        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Everywhere Ventures',
                status: 'error',
                message: 'An error occurred while sending the form',
                attempt: attempt,
            });

            if (attempt >= MAX_ATTEMPTS) {
                console.error('Достигнуто максимальное количество попыток.');
            } else {
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

module.exports = fillEverywhereVcForm;
