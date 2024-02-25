const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("../middlewares/multer");
const { MissingParamError, BadRequestError } = require("../errors/exceptions");
const HttpCode = require("../errors/HttpCode");

const router = Router();

/** @property {string} */
const BASE_DIR = "public";

/** @property {string} */
const CHILD_DIR = "uploads";

router.post("/v1/upload", multer, (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      throw new MissingParamError("file");
    }

    //
    const folderName = req.body.folderName ?? "";
    const saveAsName = Date.now() + "-" + file.originalname;
    //
    const folderURL = path.join(CHILD_DIR, folderName);
    const dirToStream = path.join(BASE_DIR, folderURL);

    // Check if uploads directory exists, create it if not
    if (!fs.existsSync(dirToStream)) {
      // Enabled recursive for nested directory EX: /uploads/profile/....
      fs.mkdirSync(dirToStream, { recursive: true });
    }
    // save in to base /public/upload/.....
    const fileURL = path.join(folderURL, saveAsName);
    const filePath = path.join(dirToStream, saveAsName);
    const writeStream = fs.createWriteStream(filePath);

    writeStream.write(file.buffer, (err) => {
      if (err) {
        console.error(err);
        const error = new BadRequestError(err.message);
        return res.status(HttpCode.BadRequest).json(error.toJSON());
      }

      return res.json({
        originalName: file.originalname,
        savedAs: saveAsName,
        url: fileURL,
        extension: file.mimetype,
        fileSize: file.size,
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
