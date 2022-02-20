import express, {Request, Response} from 'express';
import bodyParser from "body-parser";

const cors = require('cors');
const app = express();
require('dotenv').config();
const serviceRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/users.routes');
const validateToken = require('./middlewares/validateToken');
const routerAuth = require('./routes/auth.routes');
app.use(bodyParser.json());
app.use(cors());

//Up Server
app.listen(process.env.PORT, () => {
    console.log(`Server on port 2500`);
});

//Require Connection Database
require('./connectors/Mongo');

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`API - Service Up
        ${new Date().toLocaleString()} (PORT: ${process.env.PORT})`);
});



//Register User
app.use("/users", userRoutes);

//Routes Authorization
app.use('/authorization', routerAuth);

//Api
app.use("/service/v1",validateToken, serviceRoutes);