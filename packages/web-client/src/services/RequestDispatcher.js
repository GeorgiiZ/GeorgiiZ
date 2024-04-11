export class RequestDispatcher {
  constructor(axios, globConfig) {
    this.axios = axios
    this.globalConfig = globConfig
  }

  request (params) {
    this.globalConfig.requestCount ++
    return this.axios(params)
      .then((response) => {
        this.globalConfig.requestCount--
        return Promise.resolve(response)
      })
  }

  requestGet (route, params) {
    this.globalConfig.requestCount ++
    return this.axios.get(route, params)
      .then((response) => {
        this.globalConfig.requestCount--
        return Promise.resolve(response)
      })
  }
}