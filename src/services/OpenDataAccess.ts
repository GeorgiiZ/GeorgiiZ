import axios from 'axios';
const debug = require('debug')('app:OpenDataAccess');

axios.defaults.baseURL = 'https://opendata.mkrf.ru/v2'
axios.defaults.headers = {'X-API-KEY': '973d0e0f807e5b7a4ca517467e6d7a691e002f0b7c72afacea38ce330ae19895'}

class  OpenDataAccess{
    static async  getMonuments(){
        const monumentsResponce = await axios.get('/egrkn/$?l=1000');
        //debug(monuments.data.count);
        return monumentsResponce;
    }
}

export { OpenDataAccess };
