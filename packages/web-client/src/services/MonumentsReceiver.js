import {Monument} from "@/models/Monument";
import {Geography} from "@/models/Geography";
import {MonumentProperty} from "@/models/MonumentProperty";

export class MonumentsReceiver {

  constructor(axios, requestDispatcher, monumentsMapper) {
    this.axios = axios
    this.requestDispatcher = requestDispatcher
    this.monumentsMapper = monumentsMapper
  }

  async getGeographies () {
    const geographiesResponse = await this.requestDispatcher.request(`/monuments/geographies`)
    const geographies = this.monumentsMapper.mapGeographies(geographiesResponse.data)
    return geographies
  }

  async _getMonuments (limit, skip, filter) {
    const monumentsResponse = await this.requestDispatcher.requestGet(`/monuments`, {
      params: {
        limit,
        skip,
        filter
      }
    })
    const monuments = this.monumentsMapper.mapMonuments(monumentsResponse.data)
    return monuments
  }

  async getMonuments (limit = 0, skip = 0, filterStr = '') {
    const monumentsResponse = await this.requestDispatcher.request(`/monuments?limit=${limit}&skip=${skip}&${filterStr}`)
    const monuments = this.monumentsMapper.mapMonuments(monumentsResponse.data)
    return monuments
  }

  async getMonument (id) {
    const monumentResponse = await this.requestDispatcher.request(`/monuments/${id}`)
    // const monument = this.mapMonuments(monumentsResponse.data)
    return monumentResponse.data
  }
}