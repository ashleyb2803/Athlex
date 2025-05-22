const mongoose = require("mongoose");
// shortcut variable
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
    
    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },

   date: {
    type: Date,
    required: true
   },
    
   owner: { type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },

  },


  { timestamps: true});

module.exports = mongoose.model("Workout", workoutSchema);