const mongoose  = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const uri:string = "mongodb+srv://miguelgarcia:624964935@ludycomdev.3gvqs.mongodb.net/logysto?retryWrites=true&w=majority";

mongoose.connect(uri, connectionParams)
.then((db:any) => {
    console.log(`Db Is connected to ${db.connection.host}`);
})
.catch((err:any) => console.error(`[ERROR] - Ha ocurrido un error al intentar abrir la conexión: ${err}`));