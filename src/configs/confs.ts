export interface configsTypes {
    PORT?:string,
    secretKey?: string,
    APIKEY?: string
}


const confs : configsTypes  = {
    PORT: process.env.PORT,
    secretKey: process.env.SECRETKEY,
    APIKEY: process.env.APIKEY || ""
}

module.exports = confs