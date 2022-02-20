const mongoose  = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const uri:string = "mongodb+srv://davierperez:e63EtEDOooZHBtlF@ludycomdev.3gvqs.mongodb.net/logysto?retryWrites=true&w=majority";

mongoose.connect(uri, connectionParams)
.then((db:any) => {
    console.log(`Db Is connected to ${db.connection.host}`);
})
.catch((err:any) => console.error(`[ERROR] - Ha ocurrido un error al intentar abrir la conexión: ${err}`));