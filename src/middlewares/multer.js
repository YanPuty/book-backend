const multer = require("multer");
const { BadRequestError } = require("../errors/exceptions");

require("dotenv").config();

module.exports = (req, res, next) => {
  const maximumFileSizeInMegabyte = process.env.MAXIMUM_UPLOAD_SIZE || "5"; // Default Upload Size 5mb
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: parseInt(maximumFileSizeInMegabyte) * 1024 * 1024, // no larger than 5mb
    },
  });

  const single = upload.single("file");

  return single(req, res, function (error) {
    if (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        const message = `File size must be smaller than ${maximumFileSizeInMegabyte}MB`;
        error = new BadRequestError(message);
      }
      next(error);
    } else {
      next();
    }
  });
};
