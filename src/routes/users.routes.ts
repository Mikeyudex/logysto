import express from 'express';
const router = express.Router();
const {createUser} = require('../controllers/UsersController')


router.post('/create', createUser);

module.exports = router;