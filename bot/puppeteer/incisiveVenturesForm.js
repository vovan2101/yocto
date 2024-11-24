const puppeteer = require('puppeteer');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillIncisiveVenturesForm = async (formData) => {
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
                investor: 'Incisive Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Incisive Ventures form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            page = await browser.newPage();
            await page.goto('https://airtable.com/appAMCFupamv6Euf8/shrKq915ChZNzweep', { waitUntil: 'networkidle2' });

            // Закрытие cookie-предупреждения, если оно есть
            const cookieCloseButtonSelector = '.onetrust-close-btn-handler';
            const cookieCloseButton = await page.$(cookieCloseButtonSelector);
            if (cookieCloseButton) {
                await cookieCloseButton.click();
            }

            await page.waitForSelector('.formFieldAndSubmitContainer');

            // Текстовые поля
            const inputSelectors = [
                '.sharedFormField:nth-of-type(1) input', // First Name
                '.sharedFormField:nth-of-type(2) input', // Last Name
                '.sharedFormField:nth-of-type(3) input', // Startup Name
                '.sharedFormField:nth-of-type(4) input', // Founder Email
                '.sharedFormField:nth-of-type(6) input', // Founder 1 LinkedIn
                '.sharedFormField:nth-of-type(7) input', // Founder 2 LinkedIn
                '.sharedFormField:nth-of-type(8) input', // Founder 3 LinkedIn
                '.sharedFormField:nth-of-type(9) input', // Pitch Deck URL
                '.sharedFormField:nth-of-type(10) input', // Website link for startup
                '.sharedFormField:nth-of-type(19) input', // Raising Amount
                '.sharedFormField:nth-of-type(20) input'  // Post-money valuation
            ];

            const inputFields = await Promise.all(inputSelectors.map(selector => page.$(selector)));

            for (let i = 0; i < inputFields.length; i++) {
                const field = inputFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = formData.first_name;
                        break;
                    case 1:
                        value = formData.last_name;
                        break;
                    case 2:
                        value = formData.company_name;
                        break;
                    case 3:
                        value = formData.email;
                        break;
                    case 4:
                        value = formData.ceo_linkedin;
                        break;
                    case 5:
                        value = formData.founder2_linkedin;
                        break;
                    case 6:
                        value = formData.founder3_linkedin;
                        break;
                    case 7:
                        value = formData.pitch_deck;
                        break;
                    case 8:
                        value = formData.company_website;
                        break;
                    case 9:
                        value = formData.capital_to_raise;
                        break;
                    case 10:
                        value = formData.post_money_valuation;
                        break;
                }

                if (field && value) {
                    await field.click({ clickCount: 3 });
                    await field.type(value);
                }
            }

            // Многострочные текстовые поля
            const contentEditableSelectors = [
                '.sharedFormField:nth-of-type(11) .contentEditableTextbox', // Elevator pitch
                '.sharedFormField:nth-of-type(13) .contentEditableTextbox', // Solution
                '.sharedFormField:nth-of-type(21) .contentEditableTextbox', // Total amount of prior financing
                '.sharedFormField:nth-of-type(22) .ql-editor',              // Investors participating
                '.sharedFormField:nth-of-type(25) .contentEditableTextbox'  // Anything else you want us to know
            ];

            const contentEditableFields = await Promise.all(contentEditableSelectors.map(selector => page.$(selector)));

            for (let i = 0; i < contentEditableFields.length; i++) {
                const field = contentEditableFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = formData.pitch_description;
                        break;
                    case 1:
                        value = formData.company_solution;
                        break;
                    case 2:
                        value = formData.raising_amount;
                        break;
                    case 3:
                        value = formData.investors_participating;
                        break;
                    case 4:
                        value = formData.want_us_to_know;
                        break;
                }

                if (field && value) {
                    await field.click();
                    await field.type(value);
                }
            }

            // Выпадающие списки
            const dropdownSelectors = [
                '.sharedFormField:nth-of-type(5) [data-testid="autocomplete-button"]',   // Entrepreneurial experience
                '.sharedFormField:nth-of-type(12) [data-testid="autocomplete-button"]',  // Business incorporated
                '.sharedFormField:nth-of-type(14) [data-testid="autocomplete-button"]',  // Primary product
                '.sharedFormField:nth-of-type(15) [data-testid="autocomplete-button"]',  // Industry
                '.sharedFormField:nth-of-type(16) [data-testid="autocomplete-button"]',  // Product status
                '.sharedFormField:nth-of-type(17) [data-testid="autocomplete-button"]',  // Monthly revenue
                '.sharedFormField:nth-of-type(18) [data-testid="autocomplete-button"]',  // Raising round
                '.sharedFormField:nth-of-type(23) [data-testid="autocomplete-button"]',  // How did you hear about us?
                '.sharedFormField:nth-of-type(24) [data-testid="autocomplete-button"]',  // Share with other funds?
            ];

            const dropdownFields = await Promise.all(dropdownSelectors.map(selector => page.$(selector)));

            for (let i = 0; i < dropdownFields.length; i++) {
                const field = dropdownFields[i];
                let value;

                switch (i) {
                    case 0:
                        value = formData.prev_experience;
                        break;
                    case 1:
                        value = formData.headquartered;
                        if (value === 'US') {
                            value = 'United States of America';
                        } else if (value === 'Asia - India / Pakistan / Bangladesh') {
                            value = 'Asia - India / Pakistan';
                        } else if (value === 'Mexico' || value === 'Australia / New Zealand') {
                            value = 'Other';
                        }
                        break;
                    case 2:
                        // Handle multi-select for productString
                        if (typeof formData.productString === 'string' && formData.productString.length > 0) {
                            const productValues = formData.productString.split('; ');
                            for (let product of productValues) {
                                await field.click();
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                await page.keyboard.type(product);
                                await page.keyboard.press('Enter');
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            }
                            continue; // Move to next field
                        } else {
                            value = '';
                        }
                        break;
                    case 3:
                        // Handle industries
                        const industries = formData.industryString.split('; ');
                        const allowedValues = [
                            'Advertising / Marketing', 'Beauty / Fashion Products', 'Blockchain / Crypto / NFT / Web3',
                            'Cannabis', 'Cleantech / Climate / Sustainability', 'Communications / Collaboration / Productivity',
                            'Construction / Materials', 'Data / Analytics', 'AI / ML', 'Development tools & Infrastructure',
                            'Education / Personal and professional development', 'Electronics / IOT',
                            'Family / Parenting / Relationships / ElderTech', 'Finance - banking / payments / lending',
                            'Finance - Insurance', 'Finance - Other', 'Food / Beverages / agriculture', 'Health / Fitness / Wellness',
                            'HR / hiring / employment', 'Legal / government / regulation', 'Supply Chain: Logistics / Shipping / Delivery',
                            'Manufacturing', 'Medical devices', 'Mobility / Transportation', 'Personal and Professional Services',
                            'Pets / animals', 'Physical infrastructure / Utilities', 'Real Estate / Housing', 'Robotics / drones',
                            'Sales / Operations / Customer Service', 'Science / deep tech', 'Social media / Networking',
                            'Travel / Hospitality', 'General / Industry agnostic'
                        ];

                        let foundMatch = false;

                        for (let industry of industries) {
                            let value = 'Other';

                            if (allowedValues.includes(industry)) {
                                value = industry;
                                foundMatch = true;
                            } else if (industry === 'Social Media / Community / Networking') {
                                value = 'Social media / Networking';
                                foundMatch = true;
                            } else if (industry === 'Augmented reality (AR)' || industry === 'Virtual reality (VR)') {
                                value = 'Metaverse - AR/VR/ Other';
                                foundMatch = true;
                            }

                            if (foundMatch) {
                                await field.click();
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                await page.keyboard.type(value);
                                await page.keyboard.press('Enter');
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            }
                        }

                        if (!foundMatch) {
                            await field.click();
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await page.keyboard.type('Other');
                            await page.keyboard.press('Enter');
                        }

                        continue; // Move to next field
                    case 4:
                        value = formData.product_status;
                        break;
                    case 5:
                        value = formData.earning_amount;
                        if (value === '1-$999') {
                            value = '< 1000';
                        } else if (value === '$1000-$10,000' || value === '$1000-$4,999') {
                            value = '1000 - 9,999';
                        } else if (value === '$5,000-$10,000') {
                            value = '5,000-10,000';
                        } else if (value === '$10,001+') {
                            value = '10,000 - 49,999';
                        }
                        break;
                    case 6:
                        value = formData.raising_round;

                        if (value === 'Pre-Seed extension') {
                            value = 'Pre-Seed';
                        } else if (value === 'Seed extension') {
                            value = 'Seed+';
                        } else if (value === 'Series A' || value === 'Beyond Series A') {
                            value = 'Series A or later';
                        }
                        break;
                    case 7:
                        value = 'Research/Search - google, etc.';
                        break;
                    case 8:
                        value = formData.share_submission;
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

            // Нажимаем кнопку отправки формы
            const submitButtonSelector = '.formSubmit .submitButton';
            const currentUrl = page.url(); // Сохраняем текущий URL

            // await Promise.all([
            //     page.click(submitButtonSelector),
            //     page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }),
            // ]);

            const newUrl = page.url(); // Получаем новый URL после навигации

            if (newUrl !== currentUrl) {
                console.log('Incisive Ventures form submitted successfully and redirected to the main page.');
                broadcast({
                    investor: 'Incisive Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } else {
                throw new Error('Incisive Ventures form submission failed: URL did not change after submission.');
            }

        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Incisive Ventures',
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
            page = null;
            browser = null;
        }
    };
};

module.exports = fillIncisiveVenturesForm;
