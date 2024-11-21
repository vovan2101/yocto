const puppeteer = require('puppeteer');

const fillForm = async (formData) => {
    if (!formData) {
        console.error('No form data received');
        return;
    }

    console.log('Filling Precursorvc form with data:', formData);

    let browser;
    let page;

    try {
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
            await page.type('#input_2_3_other', formData.other_relationship);
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
            locationValue = formData.other_specific_location;
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

        // Ожидание перед отправкой формы
        await new Promise(resolve => setTimeout(resolve, 10000));

        // await page.screenshot({ path: 'precursorvc_form_before_submission.png', fullPage: true });
        // await page.click('#gform_submit_button_2');
        // await page.screenshot({ path: 'precursorvc_form_after_submission.png', fullPage: true });

        try {
            await page.waitForFunction(() => {
                return document.body.innerText.includes('Thank you');
            }, { timeout: 5000 });

            console.log('Precursor VC Form submitted successfully');
        } catch (e) {
            // Делайте скриншот страницы для отладки
            // await page.screenshot({ path: 'precursorvc_form_error.png', fullPage: true });
            throw new Error('Precursor vc form submission failed: "Thank you" message not found');
        }
    } catch (error) {
        console.error('Error while filling the form:', error);
        throw error; // Пробрасываем ошибку для механизма повторных попыток
    } finally {
        if (browser) {
            await browser.close(); // Закрытие браузера в любом случае
        }
        page = null;   // Обнуляем страницу
        browser = null; // Обнуляем ссылку на браузер
    }
};

module.exports = fillForm;
