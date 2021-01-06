const { Double, Long } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collections: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      places: [
        {
          name: {
            type: String,
            required: true,
          },
          direction: {
            type: String,
            required: true,
          },
          latitude: {
            type: Number,
            required: true,
          },
          length: {
            type: Number,
            required: true,
          },
          comments: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
