import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const configs: configsTypes = require('../configs/confs');
import { configsTypes } from '../configs/confs';
import { typesSearchPlacesRequest } from '../interfaces/typesSearchPlacesRequest';

/**
     * Clase que se encarga de manejar las solicitudes de búsqueda de direcciones y retorna las coordenadas.
     * @author Miguel García
*/
export class SearchAddressServiceMapbox {

    public async searchAddress(data: typesSearchPlacesRequest) {

        return new Promise((resolve, reject) => {

            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.address}.json?types=country&limit=${data.limit ?? 5}&access_token=${configs.APIKEY_MAPBOX}`;
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
                    //let dataResponse: any[] = this.responseMap(response.data?.results)
                    resolve(response?.data);
                })
                .catch((error: any) => {
                    reject(error?.response?.data)
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