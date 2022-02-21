import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const configs: configsTypes = require('../configs/confs');
import { configsTypes } from '../configs/confs';
import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';
import { SearchAddressServiceMapbox } from './SearchAddressServiceMapbox';

const searchAddressServiceMapbox : SearchAddressServiceMapbox = new SearchAddressServiceMapbox();

/**
     * Clase que se encarga de manejar las solicitudes de búsqueda de direcciones y retorna las coordenadas.
     * @author Miguel García
*/
export class SearchAddressService {

  public async searchAddress(data: typesSearchPlacesRequest) {

    return new Promise((resolve, reject) => {

      let url = `https://api.geoapify.com/v1/geocode/search?text=${data.address}&limit=${data.limit ?? 2}&type=city&lang=es&format=json&apiKey=${configs.APIKEY}`
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
          let dataResponse:any[] = this.responseMap(response.data?.results)
          resolve(dataResponse);
        })
        .catch(async(err: any) => {
          console.log(err);
          try {
            let responseServiceMapbox =  await searchAddressServiceMapbox.searchAddress(data);
            resolve(responseServiceMapbox)
          } catch (error) {
            console.log(error);
            reject(`Ha ocurrido un error al consultar la dirección`)
          }
          
        });
    })
  }

  private responseMap(data: any[]) {

    let arrayResponse: any[] = [];

    data.forEach((value: any) => {
      arrayResponse.push({ lat: value?.lat, lon: value?.lon })
    })
    return arrayResponse

  }
}