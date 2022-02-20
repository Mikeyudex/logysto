import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const configs: configsTypes = require('../configs/confs')
import { configsTypes } from '../configs/confs'
import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';


/**
     * Clase que se encarga de manejar las solicitudes de ubicaciones de restaurantes segun las coordenadas pasadas.
     * @author Miguel García
*/
export class SearchPlacesService {

  public async searchByCoords(data: typesSearchPlacesRequest) {

    return new Promise((resolve, reject) => {

      let url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&bias=proximity:${data.lon},${data.lat}&limit=${data.limit ?? 10}&lang=es&apiKey=${configs.APIKEY}`
      let config: AxiosRequestConfig = {
        method: 'get',
        url: url,
        headers: {}
      };

      axios(config)
        .then((response: AxiosResponse) => {
          if (response.status != 200) {
            reject(response?.data)
          }
          resolve(response.data)
        })
        .catch((error) => {
          reject(error?.response?.data)
        });
    })
  }
}