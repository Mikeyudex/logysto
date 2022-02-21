import { Response } from 'express';
import { SearchAddressService } from '../services/SearchAddressService';
import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';
import VerifyToken from "../middlewares/verifyToken";


const searchAddressService: SearchAddressService = new SearchAddressService();
const verifyToken = new VerifyToken();


const searchAddressController = async (req: any, res: Response) => {

    try {
        let typesRequest : typesSearchPlacesRequest = req.body;
        await verifyToken.verify(req.token);
        let responseService:any = await searchAddressService.searchAddress(typesRequest)
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
    searchAddressController
}