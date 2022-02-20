import express, {Router} from "express";
const { searchAddressController } = require('../controllers/SearchAddressController');
const router: Router = express.Router();
const validateDataRequest = require('../middlewares/validateDataRequest');



router.get("/search-address", validateDataRequest, searchAddressController);


module.exports = router;