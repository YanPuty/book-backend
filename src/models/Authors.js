const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const authorSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
      required: false,
    },
    profileImageUrl: {
      type: String,
      trim: true,
      required: false,
    },
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

// Define and export the model
const Authors = mongoose.model("Authors", authorSchema);
module.exports = Authors;
