import express from 'express';
const router = express.Router();
const {registerUser} = require('../controllers/UsersController')
const validateUserRegister = require('../middlewares/validateUsersRegister');

router.post('/register',validateUserRegister, registerUser);

module.exports = router;