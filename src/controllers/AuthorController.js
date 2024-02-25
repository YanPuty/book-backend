const { Router } = require("express");
const Authors = require("../models/Authors");
const { isValidDateString } = require("../helper/DateHelper");
const { MissingParamError, BadRequestError } = require("../errors/exceptions");

const router = Router();

/**
 * @example "YYYY-MM-DD"
 * @param {Express.Request} req
 * @returns {String}
 */
const getDateOfBirth = (req) => {
  const dateOfBirth = req.body.dateOfBirth ?? null;
  if (dateOfBirth && !isValidDateString(dateOfBirth)) {
    throw new BadRequestError("`dateOfBirth` is Invalid!");
  }
  return dateOfBirth;
};

router.post("/v1/create", async (req, res, next) => {
  try {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;

    if (!firstName) {
      throw new MissingParamError("firstName");
    }
    if (!lastName) {
      throw new MissingParamError("firstName");
    }

    const parameter = {
      firstName,
      lastName,
      dateOfBirth: getDateOfBirth(req),
      profileImageUrl: body.profileImageUrl,
    };

    const author = await Authors(parameter).save();
    return res.json(author);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
