import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';

//Valida información del request
const validateDataRequest = (req: any, res: any, next: any) => {

    let dataRequest: typesSearchPlacesRequest = req.body

    if (dataRequest.address.length === 0 || dataRequest.address.length === undefined) {
 
        return res.status(500).json(
            {
                message: 'Debe ingresar una dirección.',
                error: true
            }
        );

    } else {
        next();
    }
};

module.exports = validateDataRequest