import {Router} from 'express';
const AuthLogin = require('../controllers/AuthLoginController');

const router = Router();

router.post('/login', AuthLogin)

module.exports = router;