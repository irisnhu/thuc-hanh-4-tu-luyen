const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', (req, res, next) => {
  console.log('GET /api/users called');
  next();
}, userController.getUsers);

router.post('/users', (req, res, next) => {
  console.log('POST /api/users called with body:', req.body);
  next();
}, userController.createUser);

router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;