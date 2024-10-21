const { DataSource } = require('typeorm');
const FormResponse = require('../entities/FormResponse');
const FormRequest = require('../entities/FormRequest');

require('dotenv').config(); // Для загрузки переменных окружения

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.LOCAL_POSTGRES_HOST,
  port: process.env.LOCAL_POSTGRES_PORT,
  username: process.env.LOCAL_POSTGRES_USER,
  password: process.env.LOCAL_POSTGRES_PASSWORD,
  database: process.env.LOCAL_POSTGRES_DB,
  synchronize: true, // Автоматически создаёт таблицы на основе сущностей
  logging: true,
  entities: [FormResponse, FormRequest], // Список всех ваших сущностей
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };
