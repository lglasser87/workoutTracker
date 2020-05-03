const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: 'What is the name of workout?',
        },
        type: {
          type: String,
          trim: true,
          required: 'What is the type of workout?',
        },
        weight: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        duration: {
          type: Number,
          required: 'How long was your workout',
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercises) => {
    return total + exercises.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;