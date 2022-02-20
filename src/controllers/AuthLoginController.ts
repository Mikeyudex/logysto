import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const configs = require('../configs/confs');
const ValidateUser = require('../middlewares/validateUser');
const { comparePassword } = require('../utils/comparePassword');


/** 
     * Autentica al usuario, devolviendo un token
     * @param {Request} req
     * @param {Response} res
    */ 
const AuthLogin = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        if (username == undefined || null || username.length == 0) {

            res.status(500).json({ error: true, errorMessage: "Debe ingresar usuario y contraseña" });
        } else {
            
            let user = await ValidateUser(username);
            await comparePassword(password, user.password);
            const token = jwt.sign({ username, password }, configs.secretKey); //Generar token para el usuario

            res.status(200).json({
                message: 'Autenticación correcta',
                token
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, errorMessage: error })
    }

}

module.exports = AuthLogin