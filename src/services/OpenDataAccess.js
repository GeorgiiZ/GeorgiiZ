import axios from 'axios';
const debug = require('debug')('app:adminRoutes');


axios.defaults.baseURL = 'https://opendata.mkrf.ru/v2'
axios.defaults.headers = {'X-API-KEY': '973d0e0f807e5b7a4ca517467e6d7a691e002f0b7c72afacea38ce330ae19895'}

class OpenDataAccess{
    async getMonuments(){
        const monuments = await axios.get('/egrkn/$?l=10');
    }
}

export { OpenDataAccess };
