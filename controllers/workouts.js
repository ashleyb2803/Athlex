const express = require('express');
const router = express.Router();

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
// router.use(ensureLoggedIn);

// ALL paths start with '/workouts'

// index action
// GET /workouts
// Example of a non-protected route
router.get('/', (req, res) => {
  res.send('List of all workouts - not protected');
});

// GET /workouts/new
// Example of a protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Create a workout!');
});

module.exports = router;