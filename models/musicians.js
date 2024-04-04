const mongoose = require("mongoose");
const musiciansSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    instruments: {
      type: [String],
      required: true,
    },
    bands: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

musiciansSchema.index({ fname: 1, lname: 1 });

const musician = mongoose.model("musician", musiciansSchema);
module.exports = musician;
