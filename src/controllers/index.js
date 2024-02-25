const { Router } = require("express");

const bookController = require("./BookController");
const authorController = require("./AuthorController");
const filesController = require("./FileController");

const router = Router();

router.use("/books/", bookController);
router.use("/authors/", authorController);
router.use("/files/", filesController);

module.exports = router;
