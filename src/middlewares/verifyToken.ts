import jwt_decode from "jwt-decode";
const jwt = require('jsonwebtoken');
const confs = require('../configs/confs');



export default class VerifyToken {

    /**
     * Verifica si el token es valido.
     * @param {string} token
    */  
    public verify(token:string) {
        
        return new Promise<any>((resolve:any, reject:any) => {
            jwt.verify(JSON.parse(token), confs.secretKey, (err:any, data:any) => {
                if (err) {
                    console.log(err)
                    reject()
                } else {
                    let decode = jwt_decode(token)
                    resolve(decode)
                }
            });
        })

    }
}
