const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const app = require("./server")
const sequelize = require("./config/config");
const logger = require("./logger");
require("dotenv").config();

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`);

  // Запускаем воркеры по количеству ядер
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Логируем завершение воркера и перезапускаем его
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died with code ${code}, signal ${signal}`);
    logger.info("Starting a new worker");
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 3000;

  // Проверка соединения с базой данных
  sequelize
    .authenticate()
    .then(() => {
      logger.info(`Worker ${process.pid}: Database connected`);
    })
    .catch((err) => {
      logger.error(`Worker ${process.pid}: Database connection failed`, err);
      process.exit(1);
    });

  // Запуск сервера
  app.listen(PORT, () => {
    logger.info(`Worker ${process.pid} started on port ${PORT}`);
  });
}