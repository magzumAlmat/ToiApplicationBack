// const express = require('express');
// const cors = require('cors');
// const app = express();
// const multer = require("multer");
// // Middleware
// const fs = require("fs");
// const path = require("path");
// const File = require("./models/File");



// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from Node.js backend!' });
// });


// app.use(require('./auth/routes'));
// const restaurantRouter = require('./routes/restaurantRouter');
// app.use('/api', restaurantRouter);
// const superRouter=require('./routes/superRouter')
// app.use('/api', superRouter);





// // Настройка Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Файлы сохраняются в папку "uploads"
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname); // Уникальное имя файла
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
//     "application/msword", // DOC
//     "application/pdf", // PDF
//     "image/jpeg", // DJVU
//     "image/png", // DJVU (альтернативный MIME-тип)
//     "video/mp4", // MP4
//     "*/*",
    
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation"

//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only Word, PDF, DJVU, and MP4 files are allowed."));
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 900, // Максимальный размер файла: 900MB
//   },
//   fileFilter: fileFilter,
// });

// // Обработчик загрузки файлов
// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   console.log('Должен создасться файл')
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     const { originalname, path: filePath } = req.file;
//     const correctName = req.body.name || originalname; // Используем имя из тела запроса или оригинальное имя файла

//     console.log("File uploaded to folder:", correctName);

//     // Переименовываем файл
//     const newFilePath = path.join(
//       path.dirname(filePath),
//       correctName + path.extname(originalname)
//     );

//     await fs.promises.rename(filePath, newFilePath);

//     // Создаем запись в базе данных
//     const newFile = await File.create({
//       name: correctName,
//       path: newFilePath,
//       originalname: correctName,
//       mimetype: req.file.mimetype,
//     });

//     res.status(201).json({
//       message: "File uploaded and renamed successfully!",
//       newFile,
//     });
//   } catch (error) {
//     if (error instanceof multer.MulterError) {
//       // Обработка ошибок Multer
//       if (error.code === "LIMIT_FILE_SIZE") {
//         return res.status(413).json({ message: "File too large. Maximum size allowed is 900MB." });
//       }
//     } else {
//       // Обработка других ошибок
//       console.error("Error uploading file:", error);
//       res.status(500).json({ message: "File upload failed." });
//     }
//   }
// });

// // Статическая раздача файлов
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// const PORT = 6666;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const fs = require("fs").promises; // Используем промисы для асинхронного доступа к файлам
const path = require("path");
const File = require("./models/File");
const weddingRoutes = require('./routes/WeddingRoutes');
const weddingItemRoutes = require('./routes/WeddingItemRoutes');
const wishlistRoutes = require('./routes/WhishListRoutes');
const Goods=require('./models/Goods')
const User = require('./auth/models/User')
app.use(cors({
  origin: "*", // Разрешить запросы от всех источников для тестирования
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// app.js
const businessAvailabilityRoutes = require('./routes/businessAvailabilityRouter');
app.use('/api', businessAvailabilityRoutes);




const SuvenirsRoutes=require('./routes/suvenirsRouter')
app.use('/api/suvenirs', SuvenirsRoutes);




const goodsRoutes = require('./routes/goodsRouter');


app.use('/api', goodsRoutes);

const Wedding=require('./models/Wedding')
const Wishlist=require('./models/Whishlist')


// server.js (фрагмент с маршрутом)
// app.get("/api/weddingwishes/:weddingId", async (req, res) => {
//   console.log("Запрос на /api/weddingwishes/:weddingId стартовал", req.params);
//   const { weddingId } = req.params;
//   const applink  = `exp://172.20.10.7:8081/--/wishlist/${weddingId}`
  
//   console.log('applink',applink)
//   try {
//     const wedding = await Wedding.findByPk(weddingId);
//     if (!wedding) {
//       console.log(`Свадьба с ID ${weddingId} не найдена`);
//       return res.status(404).send("Свадьба не найдена");
//     }
//     const wishlist = await Wishlist.findAll({ where: { wedding_id: weddingId } });
//     console.log("Данные свадьбы:", wedding.name, "Wishlist:", wishlist.length);

//     res.set("Content-Type", "text/html; charset=utf-8");
//     res.send(`
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${wedding.name}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           ul { list-style-type: none; padding: 0; }
//           li { margin: 10px 0; }
//           button { padding: 5px 10px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
//           button:disabled { background-color: #ccc; cursor: not-allowed; }
//         </style>
//       </head>
//       <body>
//         <h1>${wedding.name}</h1>
//         <p>Дата: ${wedding.date}</p>
//         <h2>Список подарков</h2>
//         <ul>
//           ${wishlist
//             .map(
//               item => `
//                 <li>
//                   ${item.item_name} - ${item.is_reserved ? 'Зарезервировано' : 'Свободно'}
//                   ${
//                     item.is_reserved
//                       ? ` (${item.reserved_by_unknown || (item.Reserver ? item.Reserver.username : 'Кем-то')})`
//                       : `
//                         <form action="/api/weddingwishes/${item.id}/reserve" method="POST">
//                           <input type="text" name="name" placeholder="Ваше имя" required />
//                           <button type="submit">Зарезервировать</button>
//                         </form>
//                       `
//                   }
//                 </li>
//               `
//             )
//             .join('')}
//         </ul>
//         <h4>Если у вас есть приложение, то можете пройти по ссылке <a href='${applink}'>${applink}</a></h4>
//       </body>
//       </html>
//     `);
//   } catch (error) {
//     console.error("Ошибка при загрузке свадьбы:", error);
//     res.status(500).send("Ошибка при загрузке свадьбы");
//   }
// });
// app.get("/api/weddingwishes/:weddingId", async (req, res) => {
//   console.log("Запрос на /api/weddingwishes/:weddingId стартовал", req.params);
//   const { weddingId } = req.params;
//   const applink = `exp://172.20.10.7:8081/--/wishlist/${weddingId}`;

//   console.log('applink', applink);
//   try {
//     const wedding = await Wedding.findByPk(weddingId);
//     if (!wedding) {
//       console.log(`Свадьба с ID ${weddingId} не найдена`);
//       return res.status(404).send("Свадьба не найдена");
//     }
//     const wishlist = await Wishlist.findAll({
//       where: { wedding_id: weddingId },
//       include: [{ model: User, as: 'Reserver', attributes: ['username'] }], // Предполагается связь с пользователем
//     });
//     console.log("Данные свадьбы:", wedding.name, "Wishlist:", wishlist.length);

//     res.set("Content-Type", "text/html; charset=utf-8");
//     res.send(`
//       <!DOCTYPE html>
//       <html lang="ru">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${wedding.name}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           ul { list-style-type: none; padding: 0; }
//           li { margin: 10px 0; display: flex; align-items: center; gap: 10px; }
//           button { padding: 5px 10px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
//           button:disabled { background-color: #ccc; cursor: not-allowed; }
//           .details-btn { background-color: #28A745; }
//           form { display: inline; margin: 0; }
//           input[type="text"] { padding: 5px; }
//         </style>
//       </head>
//       <body>
//         <h1>${wedding.name}</h1>
//         <p>Дата: ${wedding.date}</p>
//         <h2>Список подарков</h2>
//         <ul>
//           ${wishlist
//             .map(
//               item => `
//                 <li>
//                   ${item.item_name} - ${item.is_reserved ? 'Зарезервировано' : 'Свободно'}
//                   ${
//                     item.is_reserved
//                       ? ` (${item.reserved_by_unknown || (item.Reserver ? item.Reserver.username : 'Кем-то')})`
//                       : `
//                         <form action="/api/weddingwishes/${item.id}/reserve" method="POST">
//                           <input type="text" name="name" placeholder="Ваше имя" required />
//                           <button type="submit">Зарезервировать</button>
//                         </form>
//                       `
//                   }
//                   ${
//                     item.good_id
//                       ? `<a href="/api/goods/${item.good_id}"><button class="details-btn">Детали</button></a>`
//                       : ''
//                   }
//                 </li>
//               `
//             )
//             .join('')}
//         </ul>
//         <h4>Если у вас есть приложение, то можете пройти по  <a href='${applink}'>ссылке</a></h4>
//       </body>
//       </html>
//     `);
//   } catch (error) {
//     console.error("Ошибка при загрузке свадьбы:", error);
//     res.status(500).send("Ошибка при загрузке свадьбы");
//   }
// });

app.get("/api/weddingwishes/:weddingId", async (req, res) => {
  console.log("Запрос на /api/weddinginvitation/:weddingId стартовал", req.params);
  const { weddingId } = req.params;
  const applink = `exp://172.20.10.7:8081/--/wishlist/${weddingId}`;

  console.log('applink', applink);
  try {
    const wedding = await Wedding.findByPk(weddingId);
    if (!wedding) {
      console.log(`Свадьба с ID ${weddingId} не найдена`);
      return res.status(404).send("Свадьба не найдена");
    }
    const wishlist = await Wishlist.findAll({
      where: { wedding_id: weddingId },
      include: [{ model: User, as: 'Reserver', attributes: ['username'] }], // Assuming User model relation
    });
    console.log("Данные свадьбы:", wedding.name, "Wishlist:", wishlist.length);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Приглашение на ${wedding.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background-color: #F7F9FC; color: #2D3748; }
          .invitation-container { background-color: #FFFFFF; border-radius: 12px; padding: 20px; margin-bottom: 20px; align-items: center; border: 1px solid #E2E8F0; box-shadow: 0 2px 4px rgba(0,0,0,0.15); }
          h1 { font-size: 24px; font-weight: 700; color: #4A90E2; text-align: center; margin-bottom: 10px; }
          p { font-size: 16px; color: #2D3748; text-align: center; margin-bottom: 12px; }
          h2 { font-size: 20px; font-weight: 600; color: #FF6F61; text-align: center; margin-bottom: 10px; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; display: flex; align-items: center; gap: 10px; background-color: #FFFFFF; border-radius: 10px; padding: 12px; border: 1px solid #E2E8F0; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
          button { padding: 5px 10px; background-color: #50C878; color: white; border: none; cursor: pointer; border-radius: 6px; }
          button:disabled { background-color: #ccc; cursor: not-allowed; }
          .details-btn { background-color: #28A745; }
          form { display: inline; margin: 0; }
          input[type="text"] { padding: 5px; border: 1px solid #E2E8F0; border-radius: 4px; }
          .footer-link { font-size: 14px; color: #718096; text-align: center; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="invitation-container">
          <h1>Приглашение на свадьбу</h1>
          <p>Присоединяйтесь к празднованию свадьбы</p>
          <h2>${wedding.name}</h2>
          <p>Дата: ${wedding.date}</p>
          <p>Выберите подарок из списка ниже, чтобы порадовать молодоженов!</p>
          <h2>Список подарков</h2>
          <ul>
            ${wishlist
            .map(
              item => `
                <li>
                  ${item.item_name} - ${item.is_reserved ? 'Зарезервировано' : 'Свободно'}
                  ${
                    item.is_reserved
                      ? ` (${item.reserved_by_unknown || (item.Reserver ? item.Reserver.username : 'Кем-то')})`
                      : `
                        <form action="/api/weddingwishes/${item.id}/reserve" method="POST">
                          <input type="text" name="name" placeholder="Ваше имя" required />
                          <button type="submit">Зарезервировать</button>
                        </form>
                      `
                  }
                  ${
                    item.good_id
                      ? `<a href="/api/goods/${item.good_id}"><button class="details-btn">Детали</button></a>`
                      : ''
                  }
                </li>
              `
            )
            .join('')}
          </ul>
          <p class="footer-link">Если у вас есть приложение, то можете пройти по <a href='${applink}'>ссылке</a></p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Ошибка при загрузке приглашения:", error);
    res.status(500).send("Ошибка при загрузке приглашения");
  }
});



app.get("/api/weddingwishes/:weddingId", async (req, res) => {
  console.log("Запрос на /api/weddingwishes/:weddingId стартовал", req.params);
  const { weddingId } = req.params;
  const applink = `exp://172.20.10.7:8081/--/wishlist/${weddingId}`;

  console.log('applink', applink);
  try {
    const wedding = await Wedding.findByPk(weddingId);
    if (!wedding) {
      console.log(`Свадьба с ID ${weddingId} не найдена`);
      return res.status(404).send("Свадьба не найдена");
    }
    const wishlist = await Wishlist.findAll({
      where: { wedding_id: weddingId },
      include: [{ model: User, as: 'Reserver', attributes: ['username'] }], // Предполагается связь с пользователем
    });
    console.log("Данные свадьбы:", wedding.name, "Wishlist:", wishlist.length);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${wedding.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; display: flex; align-items: center; gap: 10px; }
          button { padding: 5px 10px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
          button:disabled { background-color: #ccc; cursor: not-allowed; }
          .details-btn { background-color: #28A745; }
          form { display: inline; margin: 0; }
          input[type="text"] { padding: 5px; }
        </style>
      </head>
      <body>
        <h1>${wedding.name}</h1>
        <p>Дата: ${wedding.date}</p>
        <h2>Список подарков</h2>
        <ul>
          ${wishlist
            .map(
              item => `
                <li>
                  ${item.item_name} - ${item.is_reserved ? 'Зарезервировано' : 'Свободно'}
                  ${
                    item.is_reserved
                      ? ` (${item.reserved_by_unknown || (item.Reserver ? item.Reserver.username : 'Кем-то')})`
                      : `
                        <form action="/api/weddingwishes/${item.id}/reserve" method="POST">
                          <input type="text" name="name" placeholder="Ваше имя" required />
                          <button type="submit">Зарезервировать</button>
                        </form>
                      `
                  }
                  ${
                    item.good_id
                      ? `<a href="/api/goods/${item.good_id}"><button class="details-btn">Детали</button></a>`
                      : ''
                  }
                </li>
              `
            )
            .join('')}
        </ul>
        <h4>Если у вас есть приложение, то можете пройти по ссылке <a href='${applink}'>${applink}</a></h4>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Ошибка при загрузке свадьбы:", error);
    res.status(500).send("Ошибка при загрузке свадьбы");
  }
});


app.get("/api/goods/:goodId", async (req, res) => {
  console.log("Запрос на /api/goods/:goodId стартовал", req.params);
  const { goodId } = req.params;

  try {
    const good = await Goods.findByPk(goodId);
    if (!good) {
      console.log(`Товар с ID ${goodId} не найден`);
      return res.status(404).send("Товар не найден");
    }
    console.log("Данные товара:", good.item_name);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${good.item_name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #1F2937; }
          p { font-size: 16px; color: #4B5563; }
          .back-btn { padding: 5px 10px; background-color: #6B7280; color: white; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        </style>
      </head>
      <body>
        <h1>${good.item_name}</h1>
        <p><strong>Категория:</strong> ${good.category || 'Не указана'}</p>
        <p><strong>Описание:</strong> ${good.description || 'Нет описания'}</p>
        <p><strong>Стоимость:</strong> ${good.cost ? `${good.cost} ₸` : 'Не указана'}</p>
        ${
          good.specs
            ? `
              <p><strong>Адрес магазина:</strong> ${good.specs.address || 'Не указан'}</p>
              <p><strong>Телефон:</strong> ${good.specs.phone || 'Не указан'}</p>
              <p><strong>Название магазина:</strong> ${good.specs.storeName || 'Не указано'}</p>
            `
            : '<p>Дополнительные данные отсутствуют</p>'
        }
        <a href="javascript:history.back()" class="back-btn">Назад</a>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Ошибка при загрузке товара:", error);
    res.status(500).send("Ошибка при загрузке товара");
  }
});

// Новый маршрут для обработки резервирования
app.post("/api/weddingwishes/:wishlistId/reserve", async (req, res) => {
  const { wishlistId } = req.params;
  const { name } = req.body; // Имя из формы

  try {
    const wishlistItem = await Wishlist.findByPk(wishlistId);
    if (!wishlistItem) {
      return res.status(404).send("Элемент не найден");
    }

    if (wishlistItem.is_reserved) {
      return res.status(400).send("Этот подарок уже зарезервирован");
    }

    await wishlistItem.update({
      is_reserved: true,
      reserved_by_unknown: name, // Сохраняем имя из формы
    });

    // Перенаправляем обратно на страницу свадьбы
    res.redirect(`/api/weddingwishes/${wishlistItem.wedding_id}`);
  } catch (error) {
    console.error("Ошибка при резервировании подарка:", error);
    res.status(500).send("Ошибка при резервировании");
  }
});


app.use(require("./auth/routes"));
const restaurantRouter = require("./routes/restaurantRouter");
app.use("/api", restaurantRouter);
const filesRouter = require("./routes/fileRouter");

app.use("/api", filesRouter);
const superRouter = require("./routes/superRouter");
app.use("/api", superRouter);

// Новые маршруты
// const technicalEquipmentRentalRouter = require("./routes/technicalEquipmentRentalRouter");
// app.use("/api", technicalEquipmentRentalRouter);

const typographyRouter = require("./routes/typographyRouter");
app.use("/api", typographyRouter);

const hotelRouter = require("./routes/hotelRouter");
app.use("/api", hotelRouter);

const eventCategoryRouter = require("./routes/eventCategoryRouter");
app.use("/api", eventCategoryRouter);


app.use('/api/', weddingRoutes);
app.use('/api/', weddingItemRoutes);
app.use('/api/', wishlistRoutes);


// Новые маршруты
technicalEquipmentRentalRouter = require("./routes/technicalEquipmentRentalRouter");
app.use("/api", technicalEquipmentRentalRouter);

// const typographyRouter = require("./routes/typographyRouter");
// app.use("/api", typographyRouter);

// const hotelRouter = require("./routes/hotelRouter");
// app.use("/api", hotelRouter);




// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Файлы сохраняются в папку "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Уникальное имя файла
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
//     "application/msword", // DOC
//     "application/pdf", // PDF
//     "image/jpeg", // JPEG
//     "image/png", // PNG
//     "video/*", // MP4
//     "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
  
//     // Добавленные типы для HEVC
//     "image/heif", // HEIF (изображения)
//     "image/heic", // HEIC (изображения, часто используется в Apple)
    
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Invalid file type. Only DOC, DOCX, PDF, JPEG, PNG, MP4, and PPTX files are allowed."
//       )
//     );
//   }
// };


const fileFilter = (req, file, cb) => {
  const isVideo = file.mimetype.startsWith("video/");
  const allowedTypes = [
    // Документы
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword", // DOC
    "application/pdf", // PDF
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX

    // Изображения
    "image/jpeg", // JPEG
    "image/png", // PNG
    "image/heif", // HEIF
    "image/heic", // HEIC
  ];

  if (isVideo || allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only documents, images, and video files are allowed."
      )
    );
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 900, // Максимальный размер файла: 900MB
  },
  fileFilter: fileFilter,
}).single("file");



// Статическая раздача файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});