const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');



// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');



// index action
// GET /workouts
// Non-protected route
router.get('/', ensureLoggedIn, async (req, res) => {
  const workouts = await Workout.find({ owner: req.user._id }).sort('-createdAt');
  res.render('workouts/index.ejs', { workouts, title: 'My Workouts' });
});

// GET /workouts/new

router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('workouts/new.ejs', { title: 'New Workout' });
});


// create route/action
// POST /workouts
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    req.body.owner = req.user._id; // Set the owner to the logged-in user
    await Workout.create(req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('/workouts/new');
  }
});


// show route/action
// GET /workouts/:id
router.get('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/show.ejs', { workout });
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
});



// delete route/action
// DELETE /applications/:id
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
});

// edit route/action
// GET /workouts/:id/edit
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.render('workouts/edit.ejs', { workout });
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
});

// update route/action
// PUT /workouts/:id
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('Update failed');
  }
});






module.exports = router;