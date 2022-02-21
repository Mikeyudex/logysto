export interface configsTypes {
    PORT?:string,
    secretKey?: string,
    APIKEY?: string,
    APIKEY_MAPBOX?:string
}


const confs : configsTypes  = {
    PORT: process.env.PORT,
    secretKey: process.env.SECRETKEY,
    APIKEY: process.env.APIKEY || "",
    APIKEY_MAPBOX : process.env.APIKEYMAPBOX || ""
}

module.exports = confs