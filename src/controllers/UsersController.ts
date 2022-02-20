import { DaoUsers } from '../dao/DaoUsers';
import { Response } from 'express';
import { typesUsers } from '../interfaces/typesUsers';
const { hashedPassword } = require('../utils/hashedPassword');
const users = new DaoUsers();

const registerUser = async (req: any, res: Response) => {

    try {
        let requestUser: typesUsers = req.body;
        let passwordHashed: string = await hashedPassword(requestUser.password);
        requestUser.password = passwordHashed
        let responseUser: string = await users.createUser(requestUser);
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