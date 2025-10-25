const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    console.log('1 req.body.name from multer= ', req.body.name); // Теперь req.body.name будет доступен
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter (optional, for restricting file types)
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

// Multer middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Max file size: 5MB
  },
  fileFilter,
});

// Экспортируем middleware для обработки файлов и текстовых полей
module.exports = upload;