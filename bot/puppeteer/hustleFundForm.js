const puppeteer = require('puppeteer');
const path = require('path');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

const fillhustleFundForm = async (formData) => {
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
                investor: 'Hustle Fund',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Hustle Fund form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable'
            });

            page = await browser.newPage();
            await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });
            await page.goto('https://hustlefund.typeform.com/to/UGTnIt?typeform-source=www.hustlefund.vc', { waitUntil: 'networkidle2' });


        // Нажатие на кнопку "Let's go!"
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('.ButtonWrapper-sc-__sc-1qu8p4z-0.kHbkoT');

        // Нажатие на кнопку "Continue"
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('.ButtonWrapper-sc-__sc-1qu8p4z-0.jOFcNH');

        // Заполнение первого текстового поля
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.type('input[type="text"][placeholder="Type your answer here..."]', `${formData.first_name} ${formData.last_name}`);
        await page.keyboard.press('Enter');
        
        // Заполнение поля Email
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.type('input[type="email"][placeholder="name@example.com"]', formData.email);
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.type('input[type="url"][placeholder="https://"]', formData.ceo_linkedin);
        await page.keyboard.press('Enter');

        // Заполнение текстового поля
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.type('input[type="text"][placeholder="Type your answer here..."]', formData.company_name);
        await page.keyboard.press('Enter');

        // Выбор радиокнопки ("Yes")
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('div[data-value-string="436ea0f1-7dd8-49c4-8d2a-fe23f9aa4275-yes"]');

            // Выбор радиокнопки для "Where is your business incorporated?"
        if (formData.headquartered === 'US') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.waitForSelector('li[aria-label="United States"] div[role="radio"]');
            const usRadio = await page.$('li[aria-label="United States"] div[role="radio"]');
            await usRadio.click();
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Выбор радиокнопки для вопроса "Are you a Delaware C Corp?"
            const delawareSelector = formData.legal_structure === 'Delaware C-Corp'
                ? 'div[data-qa="choice-0-readable-element"][aria-label="Yes"]'
                : 'div[data-qa="choice-1-readable-element"][aria-label="No"]';
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            const delawareRadio = await page.$(delawareSelector);
            await delawareRadio.click();

        } else if (formData.headquartered === 'Mexico') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.waitForSelector('li[aria-label="Latin America"] div[role="radio"]');
            const mexicoRadio = await page.$('li[aria-label="Latin America"] div[role="radio"]');
            await mexicoRadio.click();

        } else {
            // Для всех остальных случаев выбираем значение из formData.headquartered
            await new Promise(resolve => setTimeout(resolve, 1000));
            const selector = `li[aria-label="${formData.headquartered}"] div[role="radio"]`;
            await page.waitForSelector(selector);
            const otherRadio = await page.$(selector);
            await otherRadio.click();
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (formData.customers_based === 'US') {
            const selector = `li[aria-label="United States"] div[role="radio"][data-value-string="7743e446-8993-423c-bdae-a93983a3f4df"]`;
            await new Promise(resolve => setTimeout(resolve, 1000));
            const usRadio = await page.$(selector);
            await usRadio.click();
        
        } else if (formData.customers_based === 'Mexico') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const selector = 'li[aria-label="Latin America"] div[role="radio"][data-value-string="5d775a35-84d1-44a2-a596-c2f0f1393fb8"]';
            const mexicoRadio = await page.$(selector);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await mexicoRadio.click();
        
        } else if (formData.customers_based === 'Other') {
            // Если выбран 'Other', кликаем по полю, затем вводим значение и нажимаем Enter
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.press('m');
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.type(formData.other_customers_based);
            await page.keyboard.press('Enter');
        
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            let keyToPress;
            switch (formData.customers_based) {
                case 'Canada':
                    keyToPress = 'b';
                    break;
                case 'Africa':
                    keyToPress = 'c';
                    break;
                case 'Asia - Central':
                    keyToPress = 'd';
                    break;
                case 'Asia - East':
                    keyToPress = 'e';
                    break;
                case 'Asia - India / Pakistan / Bangladesh':
                    keyToPress = 'f';
                    break;
                case 'Asia - Southeast Asia':
                    keyToPress = 'g';
                    break;
                case 'Australia / New Zealand':
                    keyToPress = 'h';
                    break;
                case 'Europe':
                    keyToPress = 'i';
                    break;
                case 'Latin America':
                    keyToPress = 'j';
                    break;
                case 'Middle East':
                    keyToPress = 'k';
                    break;
                case 'Global':
                    keyToPress = 'l';
                    break;
                default:
                    throw new Error(`Unsupported customers_based value: ${formData.customers_based}`);
            }
        
            if (keyToPress) {
                await page.keyboard.press(keyToPress);
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Выбор радиокнопки для "Are you working full time?"
        if (formData.working_full_time === 'Yes') {
            const yesRadioSelector = 'div[data-value-string="df9dc6c18a56c6de-yes"]';
            const yesRadio = await page.waitForSelector(yesRadioSelector);
            await yesRadio.click();
        
            // Ожидание загрузки следующего вопроса
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            // Клик на выбранный вариант для "How long have you been working on this full-time?"
            const durationSelector = `li[aria-label="${formData.full_time_duration}"] div[role="radio"]`;
            const durationRadio = await page.waitForSelector(durationSelector);
            await durationRadio.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else if (formData.working_full_time === 'No') {
            const noRadio = await page.$('div[data-value-string="df9dc6c18a56c6de-no"]');
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            await noRadio.click();
        }

        await page.keyboard.press('Enter');

        // Заполнение текстового поля для "Short Answer"
        await page.waitForSelector('input[type="text"][placeholder="Type your answer here..."]');
        await page.type('input[type="text"][placeholder="Type your answer here..."]', formData.company_description);
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Заполнение текстового поля для "Short Answer"
        await page.waitForSelector('input[aria-labelledby*="short_text-1b3a321e-e91e-4856-b187-9aa3c84e029a"]');
        await page.type('input[aria-labelledby*="short_text-1b3a321e-e91e-4856-b187-9aa3c84e029a"]', formData.company_solution);
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        // Заполнение текстового поля для "Short Answer"
        await page.waitForSelector('input[aria-labelledby*="short_text-52ecd6f2-952d-46d6-81fa-bf73620f4227"]');
        await page.type('input[aria-labelledby*="short_text-52ecd6f2-952d-46d6-81fa-bf73620f4227"]', formData.target_customer);
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Дополнительный Enter после последнего поля
        await page.keyboard.press('Enter');


        const products = formData.productString.split('; ').filter(Boolean); // Разделяем строку по ';' и удаляем пустые строки
        let missingProducts = []; // Для отслеживания отсутствующих продуктов
        
        // Проходим по каждому продукту
        for (let product of products) {
            if (product === 'Other') {
                // Пропускаем слово "Other", но продолжаем проверку на наличие other_product
                continue;
            }
        
            const productSelector = `li[aria-label="${product.trim()}"]`;
            let productCheckbox = await page.$(productSelector);
        
            if (!productCheckbox) {
                // Если продукт не найден, добавляем его в список для "Other"
                missingProducts.push(product);
            } else {
                // Если продукт найден, кликаем по нему
                await new Promise(resolve => setTimeout(resolve, 1000));
                await productCheckbox.click();
            }
        }
        
        // Если есть пропущенные продукты или "Other" присутствует в formData
        if (missingProducts.length > 0 || products.includes("Other")) {
            // Находим и кликаем на поле "Other"
            const otherSelector = 'div[data-qa="choice"][data-qa-index="8"]'; // Новый селектор для "Other"
            let otherCheckbox = await page.$(otherSelector);
        
            if (otherCheckbox) {
                await otherCheckbox.evaluate(el => el.scrollIntoView({ block: 'center', inline: 'center' }));
                await new Promise(resolve => setTimeout(resolve, 1000));
                await otherCheckbox.click();
        
                // Собираем все значения для поля "Other"
                let otherValues = [...missingProducts];
                if (formData.other_product) {
                    otherValues.push(formData.other_product); // Добавляем значение из other_product
                }
        
                // Вводим значения в поле "Other"
                const otherInputSelector = 'div[data-qa="choice-8-readable-element"]';
                const otherInput = await page.$(otherInputSelector);
                if (otherInput) {
                    await otherInput.type(otherValues.join(', ')); // Вписываем все значения через запятую
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка перед нажатием Enter
                    await page.keyboard.press('Enter');
                }
            }
        }
        
        

        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        const businessModels = formData.businessModelString.split('; ').filter(Boolean); // Удаляем пустые строки
        let missingModels = []; // Для отслеживания отсутствующих бизнес-моделей
        
        // Проходим по каждой бизнес-модели
        for (let model of businessModels) {
            if (model === 'Other') {
                // Пропускаем слово "Other", но продолжаем проверку на наличие other_business_model
                continue;
            }
        
            const modelSelector = `li[aria-label="${model.trim()}"] div[role="checkbox"]`;
            let modelCheckbox = await page.$(modelSelector);
        
            if (!modelCheckbox) {
                // Если бизнес-модель не найдена, добавляем её в список для "Other"
                missingModels.push(model);
            } else {
                // Если бизнес-модель найдена, кликаем по ней
                await new Promise(resolve => setTimeout(resolve, 1000));
                await modelCheckbox.click();
            }
        }
        
        // Если есть пропущенные бизнес-модели или "Other" присутствует в formData
        if (missingModels.length > 0 || businessModels.includes("Other")) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.press('h');
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            // Собираем все значения для поля "Other"
            let otherValues = [...missingModels];
            if (formData.other_business_model) {
                otherValues.push(formData.other_business_model); // Добавляем значение из other_business_model
            }
        
            // Вводим значения в поле "Other"
            const otherInputSelector = 'div[data-qa="choice-7-readable-element"]';
            const otherInput = await page.$(otherInputSelector);
            if (otherInput) {
                await otherInput.type(otherValues.join(', ')); // Вписываем все значения через запятую
                await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка перед нажатием Enter
                await page.keyboard.press('Enter');
            }
        }
        
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        const industryMapping = {
            "AI / ML": "Artificial intelligence and machine learning (AI/ML)",
            "Beauty / Fashion Products": "Beauty / Fashion",
            "Cleantech / Climate / Sustainability": "Cleantech and Climate tech",
            "Construction / Materials": "Construction technology",
            "Blockchain / Crypto / NFT / Web3": "Cryptocurrency and blockchain",
            "Cyber Security": "Cybersecurity",
            "eCommerce": "Ecommerce",
            "FinTech": "Fintech",
            "Food / Beverages / agriculture": "Foodtech",
            "Gaming": "Gaming and eSports",
            "Healthcare": "Healthtech",
            "HR / hiring / employment": "HR tech",
            "Physical infrastructure / Utilities": "Infrastructure",
            "Finance - Insurance": "Insurtech",
            "Electronics / IOT": "Internet of Things (IoT)",
            "Legal / government / regulation": "Legal tech",
            "Science / deep tech": "Life sciences",
            "Advertising / Marketing": "Marketing tech",
            "Pets / animals": "Pet tech",
            "Real Estate / Housing": "Real estate tech",
            "SaaS": "Software as a service (SaaS)",
            "Supply Chain: Logistics / Shipping / Delivery": "Supply chain and logistics",
            "Travel / Hospitality": "Travel and hospitality",
            
            "3D printing": "3D printing",
            "Adtech": "Adtech",
            "Agtech": "Agtech",
            "Audiotech": "Audiotech",
            "Augmented reality (AR)": "Augmented reality (AR)",
            "Autonomous cars": "Autonomous cars",
            "B2B payments": "B2B payments",
            "Big Data": "Big Data",
            "Cannabis": "Cannabis",
            "Carsharing": "Carsharing",
            "Cloudtech and DevOps": "Cloudtech and DevOps",
            "Digital health": "Digital health",
            "Edtech": "Edtech",
            "Femtech": "Femtech",
            "Future of Work": "Future of Work",
            "Hardware": "Hardware",
            "Impact investing": "Impact investing",
            "Industrials": "Industrials",
            "Manufacturing": "Manufacturing",
            "Micro-mobility": "Micro-mobility",
            "Mobile": "Mobile",
            "Mobility tech": "Mobility tech",
            "Mortgage tech": "Mortgage tech",
            "Nanotechnology": "Nanotechnology",
            "Oil and gas": "Oil and gas",
            "Restaurant tech": "Restaurant tech",
            "Robotics and drones": "Robotics and drones",
            "Sales / Operations / Customer Service": "Sales / Operations / Customer Service",
            "Social Media / Community / Networking": "Social Media / Community / Networking",
            "Space tech": "Space tech",
            "Virtual reality (VR)": "Virtual reality (VR)",
            "Wearables and quantified self": "Wearables and quantified self",
            "Other": "Other"
        };
        
        const industries = (formData.industryString || '').split('; ').filter(Boolean);
        let missingIndustries = []; // Для отслеживания отсутствующих индустрий
        
        // Проходим по каждой индустрии
        for (let industry of industries) {
            if (industry === 'Other') {
                // Пропускаем слово "Other", но продолжаем проверку на наличие other_industry
                continue;
            }
        
            let mappedIndustry = industryMapping[industry] || industry; // Преобразуем через маппинг, если доступно
            const industrySelector = `li[aria-label="${mappedIndustry.trim()}"]`;
            let industryCheckbox = await page.$(industrySelector);
        
            if (!industryCheckbox) {
                // Если индустрия не найдена, добавляем её в список для "Other"
                missingIndustries.push(mappedIndustry);
            } else {
                // Если индустрия найдена, кликаем по ней
                await new Promise(resolve => setTimeout(resolve, 1000));
                await industryCheckbox.click();
            }
        }
        
        // Если есть пропущенные индустрии или "Other" присутствует в formData
        if (missingIndustries.length > 0 || industries.includes("Other")) {
            // Находим и кликаем на поле "Other"
            const otherSelector = 'div[data-qa="choice"][data-qa-index="56"]';
            let otherCheckbox = await page.$(otherSelector);
        
            if (otherCheckbox) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await otherCheckbox.click();
        
                // Собираем все значения для поля "Other"
                let otherValues = [...missingIndustries];
                if (formData.other_industry) {
                    otherValues.push(formData.other_industry); // Добавляем значение из other_industry
                }
        
                // Вводим значения в поле "Other"
                const otherInputSelector = 'div[data-qa="choice-56-readable-element"]';
                const otherInput = await page.$(otherInputSelector);
                if (otherInput) {
                    await otherInput.type(otherValues.join(', ')); // Вписываем все значения через запятую
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await page.keyboard.press('Enter');
                }
            }
        }
        
            
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000));

        const customerAcquisitions = formData.customer_acquisitionString.split('; ').filter(Boolean); // Удаляем пустые строки
        let missingAcquisitions = []; // Для отслеживания отсутствующих значений
        let isOtherUsed = false; // Флаг для отслеживания использования "Other"
        
        // Маппинг полей на клавиши
        const keyMapping = {
            "Affiliate": "a",
            "Community Engagement & Referrals": "b",
            "Content Marketing": "c",
            "Direct Sales": "d",
            "Events": "e",
            "Paid Advertisement": "f",
            "Partnerships": "g",
            "SEO": "h",
            "Social Media": "i",
            "Other": "j"
        };
        
        // Проходим по каждому способу привлечения клиентов
        for (let acquisition of customerAcquisitions) {
            if (acquisition === 'Other') {
                // Пропускаем слово "Other", но продолжаем проверку на наличие other_customer_acquisition
                continue;
            }
        
            const key = keyMapping[acquisition];
            if (!key) {
                // Если способ привлечения клиентов не найден в маппинге, добавляем его в список для "Other"
                missingAcquisitions.push(acquisition);
            } else {
                // Нажимаем соответствующую клавишу
                await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка перед нажатием
                await page.keyboard.press(key); // Нажимаем клавишу, соответствующую полю
            }
        }
        
        // Если есть пропущенные способы привлечения клиентов или "Other" присутствует в formData
        if (missingAcquisitions.length > 0 || customerAcquisitions.includes("Other")) {
            // Нажимаем клавишу для "Other"
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.press(keyMapping["Other"]);
        
            // Собираем все значения для поля "Other"
            let otherValues = [...missingAcquisitions];
            if (formData.other_customer_acquisition) {
                otherValues.push(formData.other_customer_acquisition); // Добавляем значение из other_customer_acquisition
            }
        
            // Вводим значения в поле "Other"
            const otherInputSelector = 'div[data-qa="choice-9-readable-element"]';
            const otherInput = await page.$(otherInputSelector);
            if (otherInput) {
                await otherInput.type(otherValues.join(', ')); // Вписываем все значения через запятую
                await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка перед нажатием Enter
                await page.keyboard.press('Enter');
                isOtherUsed = true; // Устанавливаем флаг для "Other"
            }
        }           
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        // Заполнение текстового поля для "Short Answer
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Ввод значения с клавиатуры
        await page.keyboard.type(formData.pitch_deck); // Вводим значение из formData.pitch_deck
        await page.keyboard.press('Enter'); // Подтверждаем ввод клавишей Enter
        await new Promise(resolve => setTimeout(resolve, 1000)); 

            
        if (formData.pitch_deck_file !== 'null' && formData.pitch_deck_file) {
            const fileInputSelector = 'input[type="file"][id^="file_upload-8ebc98c775e6796a"]';
            const fileInput = await page.$(fileInputSelector);

            if (fileInput) {
                // Загрузка файла с использованием абсолютного пути
                const absoluteFilePath = path.resolve(__dirname, '..', formData.pitch_deck_file);
                await fileInput.uploadFile(absoluteFilePath);

                // Ожидание обработки файла
                await new Promise(resolve => setTimeout(resolve, 3000));
            } 
        } 
        

        await page.keyboard.press('Enter');

        // Заполнение текстового поля для "Short Answer"
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.type(formData.company_website); // Вводим значение из formData.pitch_deck
        await page.keyboard.press('Enter');


        const productStatusMapping = {
            "Idea Stage": "a",
            "Currently building MVP": "b",
            "MVP Built": "c",
            "Full Fledged Product Built": "d"
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Проверяем значение product_status и выбираем соответствующий элемент
        if (formData.product_status === 'Idea/Prototype Stage') {
            formData.product_status = 'Idea Stage';

            // Сначала кликаем по "Idea Stage"
            const productStatusKey = productStatusMapping[formData.product_status];
            if (productStatusKey) {
                // Нажимаем соответствующую клавишу для выбора статуса
                await page.keyboard.press(productStatusKey);
            } else {
                console.error(`Unknown product status: ${formData.product_status}`);
            }

            // Переходим к вопросу про источник дохода
            if (formData.source_of_revenue === 'Other') {
                // Если выбрано "Other", кликаем по полю и вводим значение из other_source_of_revenue
                const otherRevenueSelector = 'div[data-qa="choice-5-readable-element"]'; // Селектор для "Other"
                const otherCheckbox = await page.waitForSelector(otherRevenueSelector);
                await otherCheckbox.click();

                const otherInputSelector = 'div[aria-label="Enter the input field to type your answer. Use \'enter\' to confirm"]';
                const otherInput = await page.waitForSelector(otherInputSelector);
                await otherInput.type(formData.other_source_of_revenue); // Вводим значение из other_source_of_revenue
                await page.keyboard.press('Enter');
            } else {
                // Если выбран другой источник дохода
                const revenueSourceSelector = `li[aria-label="${formData.source_of_revenue}"] div[role="radio"]`;
                const revenueSourceCheckbox = await page.waitForSelector(revenueSourceSelector);
                await revenueSourceCheckbox.click();
            }

        } else {
            // Логика для других статусов продукта
            if (formData.product_status.includes('MVP built')) {
                formData.product_status = 'MVP Built';
            } else if (formData.product_status.includes('Full-fledged product built')) {
                formData.product_status = 'Full Fledged Product Built';
            }

            // Кликаем по выбранному статусу продукта
            const productStatusKey = productStatusMapping[formData.product_status];
            if (productStatusKey) {
                // Нажимаем соответствующую клавишу для выбора статуса
                await page.keyboard.press(productStatusKey);
            } else {
                console.error(`Unknown product status: ${formData.product_status}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            // Вопрос про активных клиентов
            const activeCustomersMapping = {
                "No": "a",
                "No, but we have a wait list": "b",
                "Yes": "c"
            };

            // Проверяем значение active_customers и нажимаем соответствующую клавишу
            const activeCustomersKey = activeCustomersMapping[formData.active_customers];
            if (activeCustomersKey) {
                await page.keyboard.press(activeCustomersKey); // Нажимаем соответствующую клавишу
            } else {
                console.error(`Unknown active customers value: ${formData.active_customers}`);
            }


            // Маппинг количества пользователей на клавиши
            const userCountMapping = {
                "1-5": "a",
                "6-10": "b",
                "11-20": "c",
                "21-50": "d",
                "51-100": "e",
                "101-300": "f",
                "301-500": "g",
                "501-1k": "h",
                "1-5k": "i",
                "5-10k": "j",
                "10k+": "k"
            };

            // Логика для продолжения в зависимости от ответа на вопрос про активных клиентов
            if (formData.active_customers === 'Yes' || formData.active_customers === 'No, but we have a wait list') {
                const userCountKey = userCountMapping[formData.how_many_users];
                if (userCountKey) {
                    // Нажимаем соответствующую клавишу для выбора количества пользователей
                    await page.keyboard.press(userCountKey);
                } else {
                    console.error(`Unknown user count: ${formData.how_many_users}`);
                }


                // Переход к вопросу о доходах после выбора количества клиентов
                // Маппинг ответа на вопрос о доходах на клавиши
                const earningRevenueMapping = {
                    "Yes": "y",
                    "No": "n"
                };

                // Переход к вопросу о доходах после выбора количества клиентов
                await new Promise(resolve => setTimeout(resolve, 1000));
                const earningRevenueKey = earningRevenueMapping[formData.earning_revenue];
                if (earningRevenueKey) {
                    // Нажимаем соответствующую клавишу для выбора "Yes" или "No"
                    await page.keyboard.press(earningRevenueKey);
                    await new Promise(resolve => setTimeout(resolve, 1000));

            
                    if (formData.earning_revenue === 'Yes') {
                        // Маппинг суммы доходов на клавиши
                        const earningAmountMapping = {
                            "$1-$999": "a",
                            "$1000-$4,999": "b",
                            "$5,000-$10,000": "c",
                            "$10,001+": "d"
                        };
                    
                        // Если ответ "Yes", задаём вопрос про сумму доходов
                        const earningAmountKey = earningAmountMapping[formData.earning_amount];
                        if (earningAmountKey) {
                            // Нажимаем соответствующую клавишу для суммы доходов
                            await page.keyboard.press(earningAmountKey);
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        } else {
                            console.error(`Unknown earning amount: ${formData.earning_amount}`);
                        }
                    }
                    const revenueSourceMapping = {
                        "Ads / Sponsors": "a",
                        "Affiliate": "b",
                        "Commission (percentage of sale)": "c",
                        "Purchases": "d",
                        "Subscription": "e",
                        "Other": "f"
                    };
                    // После вопроса о сумме доходов переходим к вопросу о revenueSource
                    const otherKey = revenueSourceMapping["Other"];
                    if (otherKey) {
                        // Нажимаем клавишу для выбора "Other"
                        await page.keyboard.press(otherKey);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                
                        // Вводим значение из other_source_of_revenue
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await page.keyboard.type(formData.other_source_of_revenue); // Вводим значение
                        await page.keyboard.press('Enter'); // Подтверждаем ввод
                    } else {
                        console.error(`Mapping for "Other" is missing`);
                    }
                } else {
                    // Если выбран другой источник дохода
                    const revenueSourceMapping = {
                        "Ads / Sponsors": "a",
                        "Affiliate": "b",
                        "Commission (percentage of sale)": "c",
                        "Purchases": "d",
                        "Subscription": "e",
                        "Other": "f"
                    };
                
                    const revenueSourceKey = revenueSourceMapping[formData.source_of_revenue];
                    if (revenueSourceKey) {
                        // Нажимаем соответствующую клавишу для источника дохода
                        await page.keyboard.press(revenueSourceKey);
                    } else {
                        console.error(`Unknown source of revenue: ${formData.source_of_revenue}`);
                    }
                }
            } else if (formData.active_customers === 'No') {
                // Вопрос о revenueSource 
                if (formData.source_of_revenue === 'Other') {
                    // Маппинг источников дохода на клавиши
                    const revenueSourceMapping = {
                        "Ads / Sponsors": "a",
                        "Affiliate": "b",
                        "Commission (percentage of sale)": "c",
                        "Purchases": "d",
                        "Subscription": "e",
                        "Other": "f"
                    };
            
                    const otherKey = revenueSourceMapping["Other"];
                    if (otherKey) {
                        // Нажимаем клавишу для выбора "Other"
                        await page.keyboard.press(otherKey);
            
                        // Сразу вводим значение из other_source_of_revenue
                        await page.keyboard.type(formData.other_source_of_revenue); // Вводим значение
                        await page.keyboard.press('Enter'); // Подтверждаем ввод
                    } else {
                        console.error(`Mapping for "Other" is missing`);
                    }
                } else {
                    // Если выбран другой источник дохода
                    const revenueSourceMapping = {
                        "Ads / Sponsors": "a",
                        "Affiliate": "b",
                        "Commission (percentage of sale)": "c",
                        "Purchases": "d",
                        "Subscription": "e",
                        "Other": "f"
                    };
            
                    const revenueSourceKey = revenueSourceMapping[formData.source_of_revenue];
                    if (revenueSourceKey) {
                        // Нажимаем соответствующую клавишу для источника дохода
                        await page.keyboard.press(revenueSourceKey);
                    } else {
                        console.error(`Unknown source of revenue: ${formData.source_of_revenue}`);
                    }
                }
            }            
        }   
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        // Ожидание и обработка raising_round
        // Маппинг раундов на клавиши
        const raisingRoundMapping = {
            "Pre-seed": "a",
            "Seed": "b",
            "Seed+": "c",
            "Series A or Later": "d",
            "Other": "e"
        };

        // Ожидание и обработка raising_round
        let selectedRound;

        if (formData.raising_round === "Pre-Seed" || formData.raising_round === "Pre-Seed extension") {
            selectedRound = "Pre-seed"; // Кнопка A
        } else if (formData.raising_round === "Seed") {
            selectedRound = "Seed"; // Кнопка B
        } else if (formData.raising_round === "Seed extension") {
            selectedRound = "Seed+"; // Кнопка C
        } else if (formData.raising_round === "Series A" || formData.raising_round === "Beyond Series A") {
            selectedRound = "Series A or Later"; // Кнопка D
        } else {
            selectedRound = "Other"; // Кнопка E
        }

        const roundKey = raisingRoundMapping[selectedRound];

        if (roundKey) {
            // Нажимаем клавишу для выбранного раунда
            await page.keyboard.press(roundKey);
            if (selectedRound === "Other") {
                // Если выбран "Other", сразу вводим текст
                await page.keyboard.type(formData.raising_round); // Вводим текст для "Other"
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press('Enter');
            }
        } else {
            console.error(`Unknown raising round: ${formData.raising_round}`);
        }


        // Ожидание и заполнение первого текстового поля
        await new Promise(resolve => setTimeout(resolve, 5000));
        await page.keyboard.type(formData.capital_to_raise);

        // Добавляем паузу, чтобы страница успела обработать введённое значение
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.type(formData.post_money_valuation);
        await page.keyboard.press('Enter');

        // Добавляем паузу перед нажатием Enter
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');


        // Выбор значения "Research/Search - Google, etc"
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('h');

        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');

        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.pitching_live === 'Yes') {
            // Нажимаем кнопку 'y'
            await page.keyboard.press('y');
        } else if (formData.pitching_live === 'No') {
            // Нажимаем кнопку 'n'
            await page.keyboard.press('n');
        }
        await new Promise(resolve => setTimeout(resolve, 3000));

        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.share_submission === 'Yes') {
            // Нажимаем кнопку 'a'
            await page.keyboard.press('a');
        } else if (formData.share_submission === 'No') {
            // Нажимаем кнопку 'b'
            await page.keyboard.press('b');
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        
    
    // Заполнение второго поля
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Заполнение третьего поля
        await page.keyboard.type(formData.want_us_to_know);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Нажатие на кнопку "Submit"
        await page.keyboard.down('Control'); // Нажимаем и удерживаем клавишу Ctrl
        await page.keyboard.press('Enter');  // Нажимаем клавишу Enter
        await page.keyboard.up('Control');   // Отпускаем клавишу Ctrl

            // Ожидание завершения
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Hustle Fund form submitted successfully');

            broadcast({
                investor: 'Hustle Fund',
                status: 'received',
            });
            success = true;
        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            broadcast({
                investor: 'Hustle Fund',
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

module.exports = fillhustleFundForm;