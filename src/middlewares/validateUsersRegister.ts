import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';
import { typesUsers } from '../interfaces/typesUsers';

//Valida información del registro de usuario
const validateUserRegister = (req: any, res: any, next: any) => {

    let userRequest: typesUsers = req.body

    if (userRequest.username.length === 0 || userRequest.email.length === 0 || userRequest.password.length === 0) {
 
        return res.status(500).json(
            {
                message: 'Debe ingresar la información completa',
                error: true
            }
        );

    } else {
        next();
    }
};

module.exports = validateUserRegister