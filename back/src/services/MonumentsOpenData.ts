import axios from 'axios';
const debug = require('debug')('app:MonumentsOpenData');

axios.defaults.baseURL = 'https://opendata.mkrf.ru/v2'
axios.defaults.headers = {'X-API-KEY': 'e298efb390468f49545173d734a817bde7bb4b2b5a0157c08582d58dc351c222'}

export default class  MonumentsOpenData {
    static async getMonumentById(id: string) {
        const limit = 1;
        const monumentResponse = await axios.get(`/egrkn/$?f={"nativeId":{"$eq":"${ id }"}}&l=${ limit }`);
        return monumentResponse.data.data[0];
    }
}
