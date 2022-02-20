import express from 'express';
const router = express.Router();
const {registerUser} = require('../controllers/UsersController')


router.post('/register', registerUser);

module.exports = router;