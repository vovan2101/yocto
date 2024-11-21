const kafka = require('kafka-node');
const { KafkaClient, Producer } = kafka;

const client = new KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Error in Kafka producer', error);
});

const sendMessage = (message) => {
    // Карта соответствия инвесторов и топиков Kafka
    const topicMap = {
        'Precursor Ventures': 'precursorvc-form',
        'Path Ventures': 'pathvc-form',
        'Boost Ventures': 'boost-vc-form',
        '2048 Ventures': 'ventures-2048',
        'Everywhere Ventures': 'everywhere-vc-form',
        'Wischoff Ventures': 'wischoff-form',
        'Incisive Ventures': 'incisive-ventures-form',
        'Hustle Fund': 'hustle-fund-form',
        'Liberty Ventures': 'liberty-ventures-form',
        'Spatial Capital': 'spatial-capital-form'
    };

    const selectedForms = message.selectedForms; // Массив выбранных инвесторов

    selectedForms.forEach((investorName) => {
        const topic = topicMap[investorName];
        if (topic) {
            const payloads = [
                { topic: topic, messages: JSON.stringify(message) }
            ];

            producer.send(payloads, (error, result) => {
                if (error) {
                    console.error('Failed to send message', error);
                } else {
                    console.log('Message sent successfully to topic', topic, result);
                }
            });
        } else {
            console.warn(`No topic found for investor ${investorName}`);
        }
    });
};

module.exports = sendMessage;
