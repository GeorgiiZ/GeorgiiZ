import {Monument} from "@/models/Monument";
import {Geography} from "@/models/Geography";

export class MonumentsReceiver {

  constructor(axios, requestDispatcher) {
    this.axios = axios
    this.requestDispatcher = requestDispatcher
  }

  async getGeographies () {
    const geographiesResponse = await this.requestDispatcher.request(`/monuments/geographies`)
    const geographies = this.mapGeographies(geographiesResponse.data)
    return geographies
  }

  mapGeographies (geographiesResponse) {
    return geographiesResponse.map(g => new Geography(g?.region?.value, g?.towns))
  }

  async getMonuments (limit, skip, filter) {
    const monumentsResponse = await this.requestDispatcher.request(`/monuments?limit=${limit}&skip=${skip}&filter=${filter}`)
    const monuments = this.mapMonuments(monumentsResponse.data)
    return monuments
  }

  mapMonuments (monumentsResponse) {
    return monumentsResponse.map(m => new Monument({
      id: m?.nativeId,
      name: m?.nativeName,
      region: m?.region,
      photo: m?.photo?.url,
      address: m?.address
    }))
  }
}