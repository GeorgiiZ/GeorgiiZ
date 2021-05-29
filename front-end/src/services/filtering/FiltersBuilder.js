import {Filter} from "@/services/filtering/filters/Filter";

export class FiltersBuilder {
  setSubject (filters) {
    this.filters = filters
    return this
  }

  getResult () {
    return this.filters
  }

  buildGeographyFilter (geographies) {
    let regionFilter = new Filter('Регион', geographies.map(x => x.region))
    this.filters.push(regionFilter)
    return this
  }
}