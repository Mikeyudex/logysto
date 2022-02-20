import VerifyToken from '../middlewares/verifyToken'
const validateToken = new VerifyToken()

import { DaoUsers } from '../dao/DaoUsers';
import { Response } from 'express';
const users = new DaoUsers();


const createUser = async (req: any, res: Response) => {

    try {

        let responseUser: string = await users.createUser(req.body)
        res.status(200).json(
            {
                message: responseUser,
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
    createUser
}