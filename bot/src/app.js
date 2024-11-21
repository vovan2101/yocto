const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/index'); // Импортируем все маршруты
const { producer, consumer } = require('../kafka'); // Импорт Kafka
const nodemailer = require('nodemailer');
const formatFormData = require('./utils/formatFormData');
const dotenv = require('dotenv');
const { AppDataSource} = require('./config/data-source'); // Импортируем DataSource

dotenv.config(); // Загружаем переменные окружения из .env

const app = express();
const upload = multer({ dest: 'uploads/' });

// Настройка CORS для локальной разработки
const corsOptions = {
  origin: 'http://www.yocto.vc',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Подключаем маршруты
app.use(routes);

// Маршрут для отправки форм
app.post('/send-forms', upload.fields([
  { name: 'pitch_deck_file', maxCount: 1 }
]), (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  if (req.files['pitch_deck_file']) {
    formData.pitch_deck_file = req.files['pitch_deck_file'][0].path;
  }
  // Преобразуем selectedForms обратно в массив
  if (formData.selectedForms) {
    try {
      formData.selectedForms = JSON.parse(formData.selectedForms);
    } catch (e) {
      console.error('Error parsing selectedForms:', e);
      formData.selectedForms = [];
    }
  }
  producer(formData, 'form-submissions');
    // Логика отправки email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  
    const formattedFormData = formatFormData(formData);
  
    const mailOptions = {
      from: process.env.FROM_GMAIL_EMAIL,
      to: ['pete@hundy.com', 'vladeliseykin2101@gmail.com'], // Укажите ваш email
      subject: 'Your Submitted Answers on Yocto',
      text: `${formattedFormData}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка при отправке email:', error);
        // Можно обработать ошибку по вашему усмотрению
      } else {
        console.log('Email отправлен: ' + info.response);
      }
    });
  res.send('Forms submitted successfully');
});

// Маршрут для отправки email
// Маршрут для отправки email
app.post('/send-email', (req, res) => {
  const { email, formData } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const formattedFormData = formatFormData(formData);

  const mailOptions = {
    from: process.env.FROM_GMAIL_EMAIL,
    to: [email], // Отправляем на оба адреса
    subject: 'Your Submitted Answers on Yocto',
    text: `${formattedFormData}`
  };

  console.log('GMAIL_EMAIL:', process.env.GMAIL_EMAIL);
  console.log('GMAIL_APP_PASSWORD is set:', !!process.env.GMAIL_APP_PASSWORD);


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully');
  });
});

// Экспортируем приложение
module.exports = app;