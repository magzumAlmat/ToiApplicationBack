const File = require("../models/File");
const fs = require("fs").promises;
const path = require("path");

// Класс контроллера для CRUD-операций с файлами
class FileController {
  // Создание файла (загрузка)
  static async createFile(req, res) {
    let newFilePath;
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const { entityType, entityId } = req.params;
      const { originalname, path: filePath } = req.file;
      const correctName = req.body.name || originalname;

      // Переименовываем файл
      newFilePath = path.join(
        path.dirname(filePath),
        correctName + path.extname(originalname)
      );
      await fs.rename(filePath, newFilePath);

      // Формируем данные для создания записи
      const fileData = {
        name: correctName,
        path: newFilePath,
        mimetype: req.file.mimetype,
      };

      console.log('FD= ',fileData)

      // Привязываем файл к сущности
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
        case "jewelry":
          fileData.jewelry_id = entityId;
          break;

        default:
          await fs.unlink(newFilePath);
          return res.status(400).json({ message: "Invalid entity type." });
      }

      const newFile = await File.create(fileData);
      res.status(201).json({
        message: "File uploaded successfully!",
        file: {
          id: newFile.id,
          name: newFile.name,
          path: newFile.path,
          mimetype: newFile.mimetype,
          [entityType + "_id"]: entityId,
        },
      });
    } catch (error) {
      console.error("Error creating file:", error);
      if (newFilePath) {
        await fs.unlink(newFilePath).catch((err) =>
          console.error("Failed to delete file:", err)
        );
      }
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  }

  // Получение списка файлов для сущности
  static async getFilesByEntity(req, res) {
    try {
      const { entityType, entityId } = req.params;
      let whereClause = {};

      // Определяем условие фильтрации по типу сущности
      switch (entityType.toLowerCase()) {
        case "restaurant":
          whereClause = { restaurant_id: entityId };
          break;
        case "clothing":
          whereClause = { clothing_id: entityId };
          break;
        case "tamada":
          whereClause = { tamada_id: entityId };
          break;
        case "program":
          whereClause = { program_id: entityId };
          break;
        case "traditionalgift":
          whereClause = { traditional_gift_id: entityId };
          break;
        case "flowers":
          whereClause = { flowers_id: entityId };
          break;
        case "cake":
          whereClause = { cake_id: entityId };
          break;
        case "alcohol":
          whereClause = { alcohol_id: entityId };
          break;
        case "transport":
          whereClause = { transport_id: entityId };
          break;
        case "goods":
          whereClause = { goods_id: entityId };
          break;
        case "jewelry":
          whereClause = { jewelry_id: entityId };
          break;

        default:
          return res.status(400).json({ message: "Invalid entity type." });
      }

      const files = await File.findAll({ where: whereClause });
      res.status(200).json(files);
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ message: "Error fetching files", error: error.message });
    }
  }

  // Получение файла по ID с учетом типа сущности
  static async getFileById(req, res) {
    try {
      const { entityType, entityId, fileId } = req.params;
      let whereClause = { id: fileId };

      // Добавляем фильтр по типу сущности
      switch (entityType.toLowerCase()) {
        case "restaurant":
          whereClause.restaurant_id = entityId;
          break;
        case "clothing":
          whereClause.clothing_id = entityId;
          break;
        case "tamada":
          whereClause.tamada_id = entityId;
          break;
        case "program":
          whereClause.program_id = entityId;
          break;
        case "traditionalgift":
          whereClause.traditional_gift_id = entityId;
          break;
        case "flowers":
          whereClause.flowers_id = entityId;
          break;
        case "cake":
          whereClause.cake_id = entityId;
          break;
        case "alcohol":
          whereClause.alcohol_id = entityId;
          break;
        case "transport":
          whereClause.transport_id = entityId;
          break;
        case "goods":
          whereClause.goods_id = entityId;
          break;
        case "jewelry":
          whereClause.jewelry_id = entityId;
          break;
        default:
          return res.status(400).json({ message: "Invalid entity type." });
      }

      const file = await File.findOne({ where: whereClause });
      if (!file) {
        return res.status(404).json({ message: "File not found for this entity." });
      }

      res.status(200).json(file);
    } catch (error) {
      console.error("Error fetching file by ID:", error);
      res.status(500).json({ message: "Error fetching file", error: error.message });
    }
  }

  // Обновление файла (например, имени или привязки)
  static async updateFile(req, res) {
    try {
      const { fileId } = req.params;
      const { name, entityType, entityId } = req.body;

      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).json({ message: "File not found." });
      }

      // Обновляем данные
      if (name) {
        const oldPath = file.path;
        const newFilePath = path.join(
          path.dirname(oldPath),
          name + path.extname(oldPath)
        );
        await fs.rename(oldPath, newFilePath);
        file.path = newFilePath;
        file.name = name;
      }

      // Обновляем привязку к сущности, если указаны
      if (entityType && entityId) {
        switch (entityType.toLowerCase()) {
          case "restaurant":
            file.restaurant_id = entityId;
            file.clothing_id = null; // Сбрасываем другие поля
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "clothing":
            file.clothing_id = entityId;
            file.restaurant_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "tamada":
            file.tamada_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "program":
            file.program_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "traditionalgift":
            file.traditional_gift_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "flowers":
            file.flowers_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "cake":
            file.cake_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          case "alcohol":
            file.alcohol_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.transport_id = null;
            break;
          case "transport":
            file.transport_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            break;



          case "jewelry":
            file.jewelry_id = entityId;
            file.restaurant_id = null;
            file.clothing_id = null;
            file.tamada_id = null;
            file.program_id = null;
            file.traditional_gift_id = null;
            file.flowers_id = null;
            file.cake_id = null;
            file.alcohol_id = null;
            file.transport_id = null;
            break;
          default:
            return res.status(400).json({ message: "Invalid entity type." });
        }
      }

      await file.save();
      res.status(200).json({ message: "File updated successfully!", file });
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ message: "Error updating file", error: error.message });
    }
  }

  // Удаление файла
  static async deleteFile(req, res) {
    try {
      const { fileId } = req.params;
      const file = await File.findByPk(fileId);

      if (!file) {
        return res.status(404).json({ message: "File not found." });
      }

      // Удаляем файл с диска
      await fs.unlink(file.path);
      await file.destroy();

      res.status(200).json({ message: "File deleted successfully!" });
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ message: "Error deleting file", error: error.message });
    }
  }
}

module.exports = FileController;


