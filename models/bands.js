const mongoose = require("mongoose");
const discogSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  albumFormat: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  label: {
    type: String,
  },
});
const bandsSchema = new mongoose.Schema(
  {
    bandName: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    formerMembers: {
      type: [String],
    },
    genre: {
      type: String,
    },
    country: {
      type: String,
    },
    discography: {
      type: [discogSchema],
    },
  },
  {
    timestamps: true,
  }
);

bandsSchema.index({ name: 1 });

const band = mongoose.model("band", bandsSchema);
module.exports = band;
