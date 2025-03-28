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


app.use('/api/', weddingRoutes);
app.use('/api/', weddingItemRoutes);
app.use('/api/', wishlistRoutes);


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

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword", // DOC
    "application/pdf", // PDF
    "image/jpeg", // JPEG
    "image/png", // PNG
    "video/mp4", // MP4
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only DOC, DOCX, PDF, JPEG, PNG, MP4, and PPTX files are allowed."
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

// Обработчик загрузки файлов для конкретной сущности
app.post("/api/:entityType/:entityId/files", upload, async (req, res) => {
  console.log("Должен создаться файл");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const { entityType, entityId } = req.params;
    const { originalname, path: filePath } = req.file;
    const correctName = req.body.name || originalname; // Используем имя из тела запроса или оригинальное имя файла

    console.log("1 File uploaded to folder:", correctName,'entity type',entityType,'filepath',filePath);

    // Переименовываем файл
    // console.log("2 FD",correctName)

    const newFilePath = path.join(
      path.dirname(filePath),
      correctName 
      // ,
      // path.extname(originalname)
    );
    await fs.rename(filePath, newFilePath);

    
    // Формируем данные для создания записи в базе


    console.log("3 FD",newFilePath)
    const fileData = {
      name: correctName,
      path: newFilePath,
      mimetype: req.file.mimetype,
    };
    console.log("4 FD",fileData)

    // Привязываем файл к указанной сущности
    switch (entityType.toLowerCase()) {
      case "restaurant":
        fileData.restaurant_id = entityId;
        break;
      case "clothing":
        fileData.clothing_id = entityId;
        break;
      case "tamada":
        fileData.tamada_id = entityId;
        break;
      case "program":
        fileData.program_id = entityId;
        break;
      case "traditionalgift":
        fileData.traditional_gift_id = entityId;
        break;
      case "flowers":
        fileData.flowers_id = entityId;
        break;
      case "cake":
        fileData.cake_id = entityId;
        break;
      case "alcohol":
        fileData.alcohol_id = entityId;
        break;
      case "transport":
        fileData.transport_id = entityId;
        break;
        case "goods": // Добавляем поддержку goods
        fileData.goods_id = entityId;
        break;
      default:
        await fs.unlink(newFilePath); // Удаляем файл, если сущность неверная
        return res.status(400).json({ message: "Invalid entity type." });
    }

    // Создаем запись в базе данных
    const newFile = await File.create(fileData);

    res.status(201).json({
      message: "File uploaded and renamed successfully!",
      file: {
        id: newFile.id,
        name: newFile.name,
        path: newFile.path,
        mimetype: newFile.mimetype,
        [entityType + "_id"]: entityId,
      },
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ message: "File too large. Maximum size allowed is 900MB." });
      }
      return res.status(400).json({ message: error.message });
    } else {
      console.error("Error uploading file:", error);
      if (req.file) {
        // Удаляем файл при ошибке
        await fs.unlink(req.file.path).catch((err) =>
          console.error("Failed to delete file:", err)
        );
      }
      res.status(500).json({ message: "File upload failed." });
    }
  }
});

// Статическая раздача файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});