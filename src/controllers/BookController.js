const { Router } = require("express");
const mongoose = require("mongoose");
const Books = require("../models/Books");
const BookFiles = require("../models/BookFiles");
const { isValidDateString } = require("../helper/DateHelper");
const Authors = require("../models/Authors");
const { NotFoundError } = require("../errors/exceptions");

const router = Router();

/**
 *
 * @param {Express.Request} req
 * @param {Array.<string>} files
 */
const getBooksParameter = (req, files) => {
  const body = req.body;

  return {
    title: body.title,
    releasedDate: isValidDateString(body.releasedDate)
      ? body.releasedDate
      : null,
    description: body.description,
    page: body.page,
    authorId: body.authorId,
    price: body.price,
    fileIds: files,
  };
};

router.post("/v1/create", async (req, res, next) => {
  try {
    const author = await Authors.findOne({ _id: req.body.authorId });
    if (!author) {
      throw new NotFoundError("Author does not existed!");
    }
    // Insert Files
    const filesBody = req.body.files;
    const fileIds = await BookFiles.insertMany(filesBody);

    const bookData = getBooksParameter(req, fileIds);
    let books = await new Books(bookData);
    books = await books.save();

    return res.json(books);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
