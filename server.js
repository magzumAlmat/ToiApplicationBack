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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(require("./auth/routes"));
const restaurantRouter = require("./routes/restaurantRouter");
const filesRouter = require("./routes/fileRouter");
app.use("/api", filesRouter);
app.use("/api", restaurantRouter);
const superRouter = require("./routes/superRouter");
app.use("/api", superRouter);

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
  // console.log("Должен создаться файл",req.body.formDataFile);
  // console.log("Должен создаться файл",req.file);
  // console.log("Должен создаться файл",req.body);
  try {
    if (!req.body.formDataFile) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const { entityType, entityId } = req.params;
    const { originalname, path: filePath } = req.body.formDataFile;
    const correctName = req.body.name || originalname; // Используем имя из тела запроса или оригинальное имя файла

    console.log("File uploaded to folder:", correctName);

    // Переименовываем файл
    const newFilePath = path.join(
      path.dirname(filePath),
      correctName + path.extname(originalname)
    );
    await fs.rename(filePath, newFilePath);

    // Формируем данные для создания записи в базе
    const fileData = {
      name: correctName,
      path: newFilePath,
      mimetype: req.file.mimetype,
    };

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
// app.post("/api/:entityType/:entityId/files", async (req, res) => {
//   console.log('я нутри аплод файла')
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     console.log('req file',req.file,'req params',req.params,'req body name',req.body.name)
//     const { entityType, entityId } = req.params;
//     const { originalname, path: filePath, mimetype } = req.file;
//     const correctName = req.body.name || originalname; // Имя из тела или оригинальное

//     console.log("File uploaded to folder:", filePath);

//     // Переименовываем файл
//     const newFilePath = path.join(
//       path.dirname(filePath),
//       correctName + path.extname(originalname)
//     );
//     await fs.rename(filePath, newFilePath);

//     // Формируем данные для базы
//     const fileData = {
//       name: correctName,
//       path: newFilePath,
//       mimetype: mimetype,
//     };

//     // Привязка к сущности
//     switch (entityType.toLowerCase()) {
//       case "restaurant":
//         fileData.restaurant_id = entityId; // UUID
//         break;
//       case "clothing":
//         fileData.clothing_id = entityId;
//         break;
//       case "tamada":
//         fileData.tamada_id = entityId;
//         break;
//       case "program":
//         fileData.program_id = entityId;
//         break;
//       case "traditionalgift":
//         fileData.traditional_gift_id = entityId;
//         break;
//       case "flowers":
//         fileData.flowers_id = entityId;
//         break;
//       case "cake":
//         fileData.cake_id = entityId;
//         break;
//       case "alcohol":
//         fileData.alcohol_id = entityId;
//         break;
//       case "transport":
//         fileData.transport_id = entityId;
//         break;
//       default:
//         await fs.unlink(newFilePath);
//         return res.status(400).json({ message: "Invalid entity type." });
//     }

//     const newFile = await File.create(fileData);

//     res.status(201).json({
//       message: "File uploaded and renamed successfully!",
//       file: {
//         id: newFile.id,
//         name: newFile.name,
//         path: newFile.path,
//         mimetype: newFile.mimetype,
//         [entityType + "_id"]: entityId,
//       },
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     if (req.file) {
//       await fs.unlink(req.file.path).catch((err) => console.error("Failed to delete file:", err));
//     }
//     if (error instanceof multer.MulterError) {
//       if (error.code === "LIMIT_FILE_SIZE") {
//         return res.status(413).json({ message: "File too large. Maximum size allowed is 900MB." });
//       }
//       return res.status(400).json({ message: error.message });
//     }
//     res.status(500).json({ message: "File upload failed." });
//   }
// });
// Настройка статической раздачи файлов
const uploadsDir = path.join(__dirname, "uploads");
console.log("Serving static files from:", uploadsDir);

// Разрешаем доступ к файлам в папке /uploads
app.use("/uploads", express.static(uploadsDir));



const PORT = 6666;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});