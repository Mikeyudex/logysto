import * as soap from 'soap';
import * as fs from 'fs';
import moment from 'moment';
import path from "path";

const constants = require('constants')


export class SoapService {


    static async createClient(url: string, options:any) {

        return new Promise<soap.Client>(async (resolve, reject) => {
            
                let privateKey = fs.readFileSync(path.join(__dirname, "../src/Certificados_Galilea/Keypair.p12"));
                let publicKey = fs.readFileSync(path.join(__dirname, `../src/Certificados_Galilea/galilea_uflow_biz.crt.txt`));
                let password = 'experian'; // optional password

                const sslOptions = {
                    key : privateKey,
                    cert : publicKey,
                    rejectUnauthorized: false,
                    strictSSL: false,
                    secureOptions: constants.SSL_OP_NO_TLSv1_2

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
                let client: soap.Client = await soap.createClientAsync(url, optionsSoap);
                /* client.describe()
                client.MyFunctionAsync(args); */
                client.setSecurity(new soap.ClientSSLSecurityPFX(
                    path.join(__dirname, '../src/Certificados_Galilea/Keypair.p12'),
                    'AtlasM#2022',
                    {
                        strictSSL: false,
                        secureOptions: constants.SSL_OP_NO_TLSv1_2
                    }
                ));
                await client.MyFunctionAsync(args); 
                resolve(client);
            

        });

    }


    static async initRequest(client: soap.Client, args: any) {

        return new Promise<any>(async (resolve, reject) => {
            try {
                const options = {
                    hasNonce: true,
                    actor: 'actor'
                };

                new soap.WSSecurity(
                    '',
                    '',
                    {})

                let response: any = await client.initRequest(args);
                resolve(response);
            } catch (error: any) {
                reject(error?.message ?? error);
            }
        });

    }


}