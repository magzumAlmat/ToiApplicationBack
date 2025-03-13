const express = require('express');
const cors = require('cors');
const app = express();
const multer = require("multer");
// Middleware
const fs = require("fs");
const path = require("path");
const File = require("./models/File");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});


app.use(require('./auth/routes'));
const restaurantRouter = require('./routes/restaurantRouter');
app.use('/api', restaurantRouter);
const superRouter=require('./routes/superRouter')
app.use('/api', superRouter);





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
    "image/jpeg", // DJVU
    "image/png", // DJVU (альтернативный MIME-тип)
    "video/mp4", // MP4
    "*/*",
    
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"

  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only Word, PDF, DJVU, and MP4 files are allowed."));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 900, // Максимальный размер файла: 900MB
  },
  fileFilter: fileFilter,
});

// Обработчик загрузки файлов
app.post("/api/upload", upload.single("file"), async (req, res) => {
  console.log('Должен создасться файл')
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { originalname, path: filePath } = req.file;
    const correctName = req.body.name || originalname; // Используем имя из тела запроса или оригинальное имя файла

    console.log("File uploaded to folder:", correctName);

    // Переименовываем файл
    const newFilePath = path.join(
      path.dirname(filePath),
      correctName + path.extname(originalname)
    );

    await fs.promises.rename(filePath, newFilePath);

    // Создаем запись в базе данных
    const newFile = await File.create({
      name: correctName,
      path: newFilePath,
      originalname: correctName,
      mimetype: req.file.mimetype,
    });

    res.status(201).json({
      message: "File uploaded and renamed successfully!",
      newFile,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // Обработка ошибок Multer
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "File too large. Maximum size allowed is 900MB." });
      }
    } else {
      // Обработка других ошибок
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "File upload failed." });
    }
  }
});

// Статическая раздача файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const PORT = 6666;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
