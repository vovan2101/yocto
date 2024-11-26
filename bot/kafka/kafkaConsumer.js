const kafka = require('kafka-node');

(async () => {
    const PQueue = (await import('p-queue')).default;

    const precursorvcForm = require('../puppeteer/precursorvcForm');
    const pathvcForm = require('../puppeteer/pathvcForm');
    const boostVcForm = require('../puppeteer/boostVcForm');
    const ventures2048 = require('../puppeteer/ventures2048');
    const everywhereVcForm = require('../puppeteer/everywhereVcForm');
    const wischoffForm = require('../puppeteer/wischoffForm');
    const incisiveVenturesForm = require('../puppeteer/incisiveVenturesForm');
    const hustleFundForm = require('../puppeteer/hustleFundForm');
    const libertyVenturesForm = require('../puppeteer/libertyVenturesForm');
    const spatialCapitalForm = require('../puppeteer/spatialCapitalForm');

    const { KafkaClient } = kafka;
    const client = new KafkaClient({ kafkaHost: 'kafka:9092' });
    const consumer = new kafka.Consumer(
        client,
        [
            { topic: 'precursorvc-form', partition: 0 },
            { topic: 'pathvc-form', partition: 0 },
            { topic: 'boost-vc-form', partition: 0 },
            { topic: 'ventures-2048', partition: 0 },
            { topic: 'everywhere-vc-form', partition: 0 },
            { topic: 'wischoff-form', partition: 0 },
            { topic: 'incisive-ventures-form', partition: 0 },
            { topic: 'hustle-fund-form', partition: 0 },
            { topic: 'liberty-ventures-form', partition: 0 },
            { topic: 'spatial-capital-form', partition: 0 },
        ],
        { autoCommit: true }
    );

    const queue = new PQueue({ concurrency: 3 }); // Устанавливаем одновременную обработку до 5 задач

    consumer.on('message', (message) => {
        console.log('Raw message received:', message);

        let formData;
        try {
            formData = JSON.parse(message.value.toString());
            console.log('Parsed message:', formData);
        } catch (error) {
            console.error('Error parsing message:', error);
            return; // Пропускаем сообщение, если не удалось распарсить
        }

        if (formData) {
            queue.add(async () => {
                try {
                    if (message.topic === 'spatial-capital-form') {
                        await precursorvcForm(formData);
                    } else if (message.topic === 'hustle-fund-form') {
                        await hustleFundForm(formData);
                    } else if (message.topic === 'incisive-ventures-form') {
                        await incisiveVenturesForm(formData);
                    } else if (message.topic === 'liberty-ventures-form') {
                        await spatialCapitalForm(formData);
                    } else if (message.topic === 'wischoff-form') {
                        await pathvcForm(formData);
                    } else if (message.topic === 'boost-vc-form') {
                        await boostVcForm(formData);
                    } else if (message.topic === 'ventures-2048') {
                        await ventures2048(formData);
                    } else if (message.topic === 'everywhere-vc-form') {
                        await everywhereVcForm(formData);
                    } else if (message.topic === 'precursorvc-form') {
                        await wischoffForm(formData);
                    } else if (message.topic === 'pathvc-form') {
                        await libertyVenturesForm(formData);
                    } else {
                        console.error(`Unknown topic: ${message.topic}`);
                        return; // Выходим из функции, если топик неизвестен
                    }

                    // Успешное выполнение
                } catch (error) {
                    console.error(`Error filling form for topic ${message.topic}:`, error);
                    // Повторные попытки теперь обрабатываются внутри функций форм
                }
            }).catch(error => {
                console.error('Error adding task to queue:', error);
            });
        } else {
            console.error('No form data received or unknown topic');
        }
    });

    consumer.on('error', (error) => {
        console.error('Error in Kafka consumer', error);
    });
})();
