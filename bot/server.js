const express = require('express');
const bodyParser = require('body-parser');
const { producer, consumer } = require('./kafka');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3002;

// Настройка CORS
const corsOptions = {
    origin: 'http://54.212.222.60',  // Укажите URL вашего фронтенда
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    consumer;
});
