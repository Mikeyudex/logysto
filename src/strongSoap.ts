
import * as fs from 'fs';
import moment from 'moment';
import path from "path";
const soap = require('strong-soap').soap;

export class SoapServiceStrong {


    static async createClient(url: string, options:any) {

        return new Promise<any>(async (resolve, reject) => {
            try {
                let privateKey = fs.readFileSync(path.join(__dirname, "../src/Certificados_Galilea/Keypair.p12"));
                let publicKey = fs.readFileSync(path.join(__dirname, `../src/Certificados_Galilea/galilea_uflow_biz.crt.txt`));
                let password = 'experian'; // optional password

                const sslOptions = {
                    key : privateKey,
                    cert : publicKey,
                    rejectUnauthorized: false
                }
                //let  wsSecurity2 = new soap.WSSecurityCert(privateKey, publicKey, password);

                const optionsSoap : any = {
                    sslOptions: sslOptions,
                }

                let args: any = {
                    header: {
                    },
                    body: {
                        consultarHC2: {
                            solicitud: {
                                clave: "57PFH",
                                identificacion: "888888881",
                                primerApellido: "PRUEBAS",
                                producto: "64",
                                tipoIdentificacion: 1,
                                usuario: "901582748",
                                parametros: {
                                    parametro: {
                                        tipo: "",
                                        nombre: "",
                                        valor: ""
                                    }
                                }
                            }
                        }
                    }
                }
                soap.createClient(url, (error:any, client:any) => {
                    if(error) reject(console.log(error))
                    console.log(client);

                    resolve("ok");
                });
                /* client.describe()
                client.MyFunctionAsync(args); */
                
            } catch (error: any) {
                reject(error?.message ?? error);
            }

        });

    }


   


}