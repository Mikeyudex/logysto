import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import { configsTypes } from './configs/confs';
import { SoapService } from './soap';
import { SoapServiceStrong } from './strongSoap';

const constants = require('constants')
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();
require('dotenv').config();
const confs : configsTypes = require('./configs/confs');
const serviceRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/users.routes');
const validateToken = require('./middlewares/validateToken');
const routerAuth = require('./routes/auth.routes');
app.use(bodyParser.json());
app.use(cors());

const port = 6090
//https.globalAgent.options.secureProtocol = 'SSLv3_client_method';

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, '../src/Certificados_Galilea/galilea.privatekey.biz_key.txt')),
        secureProtocol: 'TLSv1_2_method',
        cert: fs.readFileSync(path.join(__dirname, '../src/Certificados_Galilea/galilea_uflow_biz.crt.txt')),
        rejectUnauthorized: false
    },
    app
) 


//Up Server
/* app.listen(confs.PORT, () => {
    console.log(`Server on port ${confs.PORT}`);
}); */

//Init server on SSL
let server = sslServer.listen(port, async () => {
    try {
       
        console.log(`Service Up SSL on port ${port}.`);
        await SoapServiceStrong.createClient("https://demo-servicesesb.datacredito.com.co:443/wss/dhws3/services/DHServicePlus?wsdl", {})

    } catch (error) {
        console.log(error);
    }

}); 




//Require Connection Database
//require('./connectors/Mongo');

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`API - Service Up
        ${new Date().toLocaleString()} (PORT: ${port})`);
});



//Register User
app.use("/users", userRoutes);

//Routes Authorization
app.use('/authorization', routerAuth);

//Api
app.use("/service/v1",validateToken, serviceRoutes);