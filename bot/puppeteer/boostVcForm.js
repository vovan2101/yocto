const puppeteer = require('puppeteer');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { broadcast } = require('../src/app'); // Убедитесь, что путь корректен

// Функция для создания PDF с ссылкой на видео
async function createFounderVideoPdf(videoUrl) {
    const doc = new PDFDocument();

    // Путь к сохраненному PDF файлу
    const pdfFilePath = path.join(__dirname, 'founder_video_link.pdf');

    // Создаем поток для записи PDF файла
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    // Добавляем заголовок
    doc.fontSize(18).text('Founder Video URL', {
      align: 'center',
    });

    // Добавляем ссылку в PDF
    doc.moveDown();
    doc.fontSize(14).text(`Click here to view the founder's video: ${videoUrl}`, {
      align: 'center',
      link: videoUrl,
      underline: true,
    });

    // Заканчиваем создание PDF
    doc.end();

    // Ждем завершения записи файла
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(pdfFilePath); // Возвращаем путь к созданному PDF файлу
      });
      writeStream.on('error', reject);
    });
  }

const fillBoostVcForm = async (formData) => {
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
                investor: 'Boost Ventures',
                status: 'retrying',
                attempt: attempt,
            });
        }

        try {
            console.log(`Filling Boost VC form with data (Attempt ${attempt}):`, formData);

            browser = await puppeteer.launch({ 
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: '/usr/bin/google-chrome-stable',
            });

            page = await browser.newPage();
            await page.goto('https://forms.fillout.com/t/gKcwHBe9SQus', { waitUntil: 'networkidle2' });

            await page.waitForSelector('input[data-cy="input-component"][aria-label="What is your full name?"]');

            await page.type('input[data-cy="input-component"][aria-label="What is your full name?"]', `${formData.first_name} ${formData.last_name}`);
            await page.type('input[data-cy="input-component"][aria-label="What is your email address?"]', formData.email);

            let locationValue;

            // Определение местоположения на основе данных
            if (formData.specific_location === 'San Francisco / Bay Area') {
                locationValue = 'San Francisco, California, USA';
            } else if (formData.specific_location === 'New York') {
                locationValue = 'New York, New York, USA';
            } else if (formData.specific_location === 'Boston') {
                locationValue = 'Boston, Massachusetts, USA';
            } else if (formData.specific_location === 'Los Angeles') {
                locationValue = 'Los Angeles, California, USA';
            } else if (formData.specific_location === 'Austin') {
                locationValue = 'Austin, Texas, USA';
            } else if (formData.specific_location === 'Denver') {
                locationValue = 'Denver, Colorado, USA';
            } else if (formData.specific_location === 'Utah') {
                locationValue = 'Salt Lake City, Utah, USA';
            } else if (formData.specific_location === 'Chicago') {
                locationValue = 'Chicago, Illinois, USA';
            } else if (formData.specific_location === 'Seattle') {
                locationValue = 'Seattle, Washington, USA';
            } else if (formData.specific_location === 'Atlanta') {
                locationValue = 'Atlanta, Georgia, USA';
            } else if (formData.specific_location === 'Philadelphia') {
                locationValue = 'Philadelphia, Pennsylvania, USA';
            } else if (['US - Other', 'Canada - Other', 'Latin America', 'Europe', 'Asia - India', 'Asia - Other', 'Africa'].includes(formData.specific_location)) {
                locationValue = formData.other_specific_location;  // Используем значение из other_specific_location
            } else if (formData.specific_location === 'Toronto') {
                locationValue = 'Toronto, Ontario, Canada';
            } else if (formData.specific_location === 'Montreal') {
                locationValue = 'Montreal, Quebec, Canada';
            }

            await page.type('input[data-cy="input-component"][aria-label="Where are you located? (City, State/Country)"]', locationValue);

            await page.type('textarea[data-cy="text-area"][aria-label="In a few sentences, describe your idea / company."]', formData.company_description);
            await page.type('textarea[data-cy="text-area"][aria-label="In a few sentences, tell us why you / your team are awesome."]', formData.team_description);
            await page.type('textarea[data-cy="text-area"][aria-label="Provide a link to you / your team\'s LinkedIn profiles."]', `${formData.ceo_linkedin} ${formData.founder2_linkedin} ${formData.founder3_linkedin} ${formData.cto_linkedin}`);
            
            // Если есть ссылка на видео, создаем PDF и загружаем его
            if (formData.founder_video_url) {
                try {
                    // Попытка создания PDF с ссылкой на видео
                    console.log('Attempting to create PDF with video URL...');
                    const videoFilePath = await createFounderVideoPdf(formData.founder_video_url);
                    console.log(`PDF created successfully at ${videoFilePath}`);
            
                    // Находим поле для загрузки файла
                    const fileInputs = await page.$$('.filepond--wrapper .filepond--root input.filepond--browser[type="file"][name="filepond"]');
                    
                    if (fileInputs.length > 0) {
                        const videoFileInput = fileInputs[0];
            
                        // Попытка загрузить PDF файл в поле
                        try {
                            console.log(`Attempting to upload PDF file to the form field...`);
                            await videoFileInput.uploadFile(videoFilePath);
                            console.log('PDF uploaded successfully!');
            
                            // Удаляем PDF файл после успешной загрузки
                            try {
                                fs.unlinkSync(videoFilePath);
                                console.log(`Temporary PDF file deleted at ${videoFilePath}`);
                            } catch (deleteError) {
                                console.error('Failed to delete the PDF file:', deleteError);
                            }
                        } catch (uploadError) {
                            console.error('Failed to upload the PDF file:', uploadError);
                        }
                    } else {
                        console.error('No file input found for video upload!');
                    }
            
                } catch (pdfError) {
                    console.error('Failed to create PDF with video URL:', pdfError);
                }
            }


            // Загружаем pitch deck файл (если есть)
            const pitchDeckFileInput = await page.$('.filepond--wrapper .filepond--root input.filepond--browser[type="file"][name="filepond"]');
            if (pitchDeckFileInput) {
                await pitchDeckFileInput.uploadFile(path.resolve(__dirname, '..', formData.pitch_deck_file));
            }

            await page.type('input[data-cy="input-component"][aria-label="How did you hear about us?"]', "Networking events");

            await new Promise(resolve => setTimeout(resolve, 5000));
            // await page.click('button[data-cy="button-component"]');

            await new Promise(resolve => setTimeout(resolve, 2000));

            // Ожидание появления сообщения "Thank you for applying"
            try {
                await page.waitForSelector('div[data-cy="thank-you-widget"]', { timeout: 10000 });
                console.log('Boost VC form submitted successfully');
                broadcast({
                    investor: 'Boost Ventures',
                    status: 'received',
                });
                success = true; // Успешно отправлено, выходим из цикла
            } catch (e) {
                await page.screenshot({ path: 'boostvc_form_error.png', fullPage: true });
                throw new Error('Boost VC form submission failed: Thank you message not found');
            }
            
        } catch (error) {
            console.error(`Ошибка при заполнении формы на попытке ${attempt}:`, error.message);

            // Отправляем сообщение об ошибке
            broadcast({
                investor: 'Boost Ventures',
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
                await browser.close(); // Закрытие браузера
            }
            page = null;   // Очищаем переменную
            browser = null; // Очищаем ссылку на браузер
        }
    }
};

module.exports = fillBoostVcForm;
