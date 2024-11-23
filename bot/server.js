const {app, server} = require('./src/app');
const { AppDataSource } = require('./src/config/data-source'); // Импорт DataSource

const PORT = process.env.PORT || 3002;

// Инициализация базы данных перед запуском сервера
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Запуск сервера
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
