const express = require('express');
const bodyParser = require('body-parser');
const { producer, consumer } = require('./kafka');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const nodemailer = require('nodemailer'); // Импорт nodemailer
const formatFormData = require('./formatFormData'); // Импортируем функцию
require('dotenv').config(); // Загружаем переменные окружения из .env

const app = express();
const port = 3002;

// Настройка CORS
const corsOptions = {
    origin: 'http://test.yocto.vc',  // Укажите URL вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Укажите методы, которые разрешены
    allowedHeaders: ['Origin', 'Content-Type', 'Accept'],  // Укажите заголовки, которые могут быть переданы
    optionsSuccessStatus: 200  // Для старых браузеров
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/send-forms', upload.fields([
    { name: 'founder_video_file', maxCount: 1 },
    { name: 'pitch_deck_file', maxCount: 1 }
]), (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);

    if (req.files['founder_video_file']) {
        formData.founder_video_file = req.files['founder_video_file'][0].path;
    }

    if (req.files['pitch_deck_file']) {
        formData.pitch_deck_file = req.files['pitch_deck_file'][0].path;
    }
    producer(formData, 'form-submissions');
    res.send('Forms submitted successfully');
});

// Маршрут для отправки формы на email
app.post('/send-email', (req, res) => {
    const { email, formData } = req.body;

    // Настройка транспорта для отправки email через Yahoo с использованием nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Yahoo',
        auth: {
            user: process.env.YAHOO_EMAIL, // Замените на свой Yahoo email
            pass: process.env.YAHOO_APP_PASSWORD
        }
    });

    const formattedFormData = formatFormData(formData);

    // Формируем тело email с данными формы
    const mailOptions = {
        from: process.env.YAHOO_EMAIL,
        to: email,
        subject: 'Your Form Submission',
        text: `Here are your form answers:\n\n${formattedFormData}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      });
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    consumer;
});
