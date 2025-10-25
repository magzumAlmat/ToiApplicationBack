const express = require("express");



const  FileController = require( "../controllers/FileController")
const upload = require("../config/multer");
const File= require('../models/File')
const router = express.Router();

// Create
// router.post("/upload/:fileId", upload.single("file"), FileController.updateFile);




router.post("/:entityType/:entityId/files", upload.single("file"), FileController.createFile);



// Read All
// router.get("/files", listFiles);

// // Read One
// router.get("/files/:id", getFileById);


// // Update
// // Update a file (metadata or replace file)
// router.put("/files/:id", upload.single("file"), updateFile);

// // Delete
// router.delete("/files/:id", deleteFile);



router.get("/:entityType/:entityId/files", FileController.getFilesByEntity);
router.get("/:entityType/:entityId/files/:fileId", FileController.getFileById);
router.put("/files/:fileId", FileController.updateFile);
router.delete("/files/:fileId", FileController.deleteFile);


module.exports = router;