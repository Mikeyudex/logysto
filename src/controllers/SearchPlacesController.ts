import { Response } from 'express';
import { SearchPlacesService } from '../services/SearchPlacesService';
import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';
import VerifyToken from "../middlewares/verifyToken";
import { DaoTransactions } from '../dao/DaoTransactions';
import { typesTransaction } from '../interfaces/typesTransaction';

const searchPlacesService: SearchPlacesService = new SearchPlacesService();
const verifyToken = new VerifyToken();
let daoTransactions : DaoTransactions = new DaoTransactions();

const searchPlacesController = async (req: any, res: Response) => {

    try {
        let typesRequest : typesSearchPlacesRequest = req.body;
        let decode:any = await verifyToken.verify(req.token);
        let dataTransfer : typesTransaction = {

            lon: typesRequest.lon,
            lat: typesRequest.lat,
            limit: typesRequest.limit,
            username : decode.username
        }
        await daoTransactions.createTransaction(dataTransfer);
        
        let responseService:any = await searchPlacesService.searchByCoords(typesRequest)
        res.status(200).json(
            {
                message: responseService,
                error: false
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                message: "Ha ocurrido un error interno",
                error: true
            }
        )
    }

}

module.exports = {
    searchPlacesController
}