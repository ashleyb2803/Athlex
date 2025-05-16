const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');



// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
// router.use(ensureLoggedIn);

// ALL paths start with '/workouts'

// index action
// GET /workouts
// Example of a non-protected route


// index action
// GET /workouts
// Non-protected route
router.get('/', async (req, res) => {
  // Thanks to the timestamps option, we can sort by createdAt
  const workouts = await Workout.find({}).sort('-createdAt');
  res.render('workouts/index.ejs', { workouts, title: 'All Workouts' });
});


// GET /workouts/new

router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('workouts/new.ejs', { title: 'New Workout' });
});


// create route/action
// POST /workouts
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    // Be sure to add the owner's/user's ObjectId (_id)
    req.body.owner = req.user._id;
    await Listing.create(req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('/workouts/new');
  }
});


// show route/action
// GET /workouts/:id
router.get('/:id', (req, res) => {
  const app = req.user.applications.id(req.params.id);
  res.render('workouts/show.ejs', { app });
});



// delete route/action
// DELETE /applications/:id
router.delete('/:id', async (req, res) => {
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
router.get('/:id/edit', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.log(err);
    res.redirect('/workouts');
  }
});






module.exports = router;