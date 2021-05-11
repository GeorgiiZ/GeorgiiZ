import {Monument} from "@/models/Monument";

export class MonumentsReceiver {

  constructor(axios) {
    this.axios = axios
  }

  async getMonuments (limit, skip, filter) {
    const monumentsResponse = await this.axios(`/monuments?limit=${limit}&skip=${skip}&filter=${filter}`)
    const monuments = this.mapMonuments(monumentsResponse.data)
    return monuments
  }

  mapMonuments (monumentsResponse) {
    return monumentsResponse.map(m => new Monument({
      id: m.nativeId,
      name: m.nativeName,
      region: m.region,
      photo: m.photo.url,
      address: m.address
    }))
  }
}