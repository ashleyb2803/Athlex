const mongoose = require("mongoose");
// shortcut variable
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,

    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
  }},




  { timestamps: true});

module.exports = mongoose.model("User", userSchema);