import express, {Router} from "express";
const {searchPlacesController} = require('../controllers/SearchPlacesController');
const { HistoricalTransactions } = require('../controllers/HistoricalTransactions');
const router: Router = express.Router();
const validateDataRequest = require('../middlewares/validateDataRequest')


router.get("/searchByCoords",validateDataRequest, searchPlacesController);
router.get("/historical", HistoricalTransactions);

module.exports = router;