const { DataSource } = require('typeorm');
const FormResponse = require('../entities/FormResponse');

require('dotenv').config(); // Для загрузки переменных окружения

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PROD_POSTGRES_HOST,
  port: process.env.PROD_POSTGRES_PORT,
  username: process.env.PROD_POSTGRES_USER,
  password: process.env.PROD_POSTGRES_PASSWORD,
  database: process.env.PROD_POSTGRES_DB,
  synchronize: true, // Автоматически создаёт таблицы на основе сущностей
  logging: true,
  entities: [FormResponse], // Список всех ваших сущностей
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };