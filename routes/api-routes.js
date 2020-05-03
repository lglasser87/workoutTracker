const router = require('express').Router();
const Workout = require('../models/Workout');

// get workout
router.get('/api/workouts', function (req, res) {
  Workout.find({})
    .sort({ day: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// create workout
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// update by ID
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get stats
router.get('/api/workouts/range', function (req, res) {
  Workout.find()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

// post stats
router.post('/api/workouts/range', function (req, res) {
  Workout.create({})
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;