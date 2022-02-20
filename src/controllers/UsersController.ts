import { DaoUsers } from '../dao/DaoUsers';
import { Response } from 'express';
const { hashedPassword } = require('../utils/hashedPassword');
const users = new DaoUsers();




const registerUser = async (req: any, res: Response) => {

    try {

        let passwordHashed: string = await hashedPassword()
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
    registerUser
}