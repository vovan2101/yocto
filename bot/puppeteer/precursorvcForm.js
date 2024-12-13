const puppeteer = require('puppeteer');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillForm = async (formData) => {
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
                investor: 'Precursor Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Precursor Ventures form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            page = await browser.newPage();
            await page.goto('https://precursorvc.com/startup/', { waitUntil: 'networkidle2' });

            // Подождите, пока элементы формы не загрузятся
            await page.waitForSelector('#input_2_1_3');

            // Заполнение полей формы
            await page.type('#input_2_1_3', formData.first_name);
            await page.type('#input_2_1_6', formData.last_name);
            await page.type('#input_2_2', formData.email);

            if (formData.relationship.toLowerCase() === 'founder') {
                await page.click('#choice_2_3_0');
            } else {
                await page.click('#choice_2_3_1');
                await page.type('#input_2_3_other', formData.other_relationship || '');
            }

            await page.type('#input_2_4', formData.company_name);
            await page.type('#input_2_5', formData.company_description);

            const industries = formData.industryString.split('; ');
            let selectedIndustry = 'Other';

            for (let industry of industries) {
                if (industry === 'HR / hiring / employment') {
                    selectedIndustry = 'HR Tech';
                    break;
                }

                const matchedOption = await page.evaluate((industry) => {
                    const options = Array.from(document.querySelectorAll('#input_2_7 option'));
                    return options.find(option => option.textContent.trim() === industry) !== undefined;
                }, industry);

                if (matchedOption) {
                    selectedIndustry = industry;
                    break;
                }
            }

            formData.industry = selectedIndustry;
            await page.select('#input_2_7', selectedIndustry);

            await page.type('#input_2_6', formData.company_website);
            await page.type('#input_2_11', formData.pitch_deck);

            await page.select('#input_2_12', formData.headquartered_precursor);

            let locationValue;
            if ([
                'San Francisco / Bay Area', 'New York', 'Boston', 'Los Angeles',
                'Austin', 'Denver', 'Utah', 'Chicago', 'Seattle', 'Atlanta',
                'Philadelphia', 'US - Other'
            ].includes(formData.specific_location)) {
                locationValue = 'USA';
            } else if (['Toronto', 'Montreal', 'Canada - Other'].includes(formData.specific_location)) {
                locationValue = 'Canada';
            } else if (formData.specific_location === 'Asia - India') {
                locationValue = 'India';
            } else {
                locationValue = formData.other_specific_location || '';
            }
            await page.type('#input_2_17', locationValue);

            const legalStructures = {
                "Delaware C-Corp": 0,
                "Canadian company": 1,
                "B-Corp": 2,
                "Public Benefit Corporation (PBC)": 3,
                "LLC": 4,
                "S-Corp": 5,
                "Non-profit": 6,
                "Other": 7
            };

            const structure = formData.legal_structure;
            if (legalStructures.hasOwnProperty(structure)) {
                await page.click(`#choice_2_18_${legalStructures[structure]}`);
                if (structure === "Other" && formData.other_legal_structure) {
                    await page.type('#input_2_18_other', formData.other_legal_structure);
                }
            }

            await page.select('#input_2_13', formData.raising_round);
            await page.type('#input_2_15', formData.raising_amount);
            await page.type('#input_2_16', formData.pre_money_valuation);

            // Небольшая задержка перед отправкой формы
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Отправка формы
            await page.click('#gform_submit_button_2');

            // Ожидание изменения URL
            try {
                await new Promise(resolve => setTimeout(resolve, 7000));

                // Проверка изменения URL
                const currentURL = page.url();
                if (currentURL === 'https://precursorvc.com/startup/thank-you/') {
                    console.log(`Precursor Ventures form submitted successfully: ${currentURL}`);
                    broadcast({
                        investor: 'Precursor Ventures',
                        status: 'received',
                    });
                    success = true; // Успешно отправлено, выходим из цикла
                } else {
                    console.error(`URL после отправки формы не совпадает с ожидаемым. Текущий URL: ${currentURL}`);
                    throw new Error('Precursor Ventures form submission failed: URL did not change to "thank-you" page');
                }
            } catch (e) {
                console.error('Не удалось определить успешную отправку формы:', e);
                throw new Error('Precursor Ventures form submission failed: Navigation to "thank-you" page not occurred');
            }

        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Precursor Ventures',
                status: 'error',
                message: 'An error occurred while sending the form',
                attempt: attempt,
            });

            if (attempt >= MAX_ATTEMPTS) {
                console.error('Достигнуто максимальное количество попыток.');
                // Можно отправить финальное сообщение об ошибке, если требуется
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
            page = null;
            browser = null;
        }
    }
};

module.exports = fillForm;
