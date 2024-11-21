const puppeteer = require('puppeteer');
const path = require('path'); // Для загрузки файла

const fillLibertyVenturesForm = async (formData) => {
    if (!formData) {
        console.error('No form data received');
        return;
    }

    console.log('Filling Liberty Ventures form with data:', formData);

    let browser;
    let page;

    try {
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

        // Клик на поле и выбор значения в выпадающем списке (Company Industry)
        await page.click('select[id="0-2/company_industry-input"]');

        // Клик по нужному варианту в списке
        await page.evaluate((industry) => {
            const options = Array.from(document.querySelectorAll('select[id="0-2/company_industry-input"] option'));
            const optionToSelect = options.find(option => option.textContent.includes(industry));
            if (optionToSelect) {
                optionToSelect.selected = true;
                optionToSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, formData.liberty_ventures_industry);

        // Заполнение текстового поля для вопроса о ценностях
        await page.type('#how_do_the_values_of_your_team_align_with_those_of_liberty_ventures_-input', formData.value_of_team);

        // Загрузка файла (Pitch Deck)
        const fileInput = await page.$('#pitch_deck-input');
        const filePath = path.relative(process.cwd(), formData.pitch_deck_file); // Путь к PDF файлу
        await fileInput.uploadFile(filePath);

        // Заполнение поля "How did you find out about us?"
        await page.select('#how_did_you_find_out_about_us_-input', "Search Engine");

        // Нажимаем кнопку Submit (если требуется)
        // await page.click('button[type="submit"]');

        // Ожидание появления подтверждающего сообщения после отправки формы
        try {
            await page.waitForFunction(() => {
                return document.body.innerText.includes('Thanks for submitting the form.');
            }, { timeout: 10000 });

            console.log('Liberty Ventures form submitted successfully');
        } catch (error) {
            console.error('Confirmation message not detected:', error);
            throw new Error('Liberty Ventures form submission failed');
        }

    } catch (error) {
        console.error('Error while filling the form:', error);
    } finally {
        if (browser) {
            await browser.close(); // Закрытие браузера в любом случае
        }
        page = null;   // Обнуляем страницу
        browser = null; // Обнуляем ссылку на браузер
    }
};

module.exports = fillLibertyVenturesForm;
