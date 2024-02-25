const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    page: {
      type: Number,
      trim: true,
      required: false,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: false,
    },
    releasedDate: {
      type: Date,
      required: true,
    },
    authorId: {
      type: String,
      ref: "Authors",
      required: true,
    },
    fileIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookFiles",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        // Transform the _id field to id
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Books = mongoose.model("Books", BookSchema);
module.exports = Books;
