import {FilterRegion} from "@/services/filtering/filters/FilterRegion";
import {FilterTown} from "@/services/filtering/filters/FilterTown";

export class FiltersBuilder {
  setSubject (filters) {
    this.filters = filters
    return this
  }

  getResult () {
    return this.filters
  }

  buildGeographyFilter (geographies) {
    let regionFilter = new FilterRegion('Регион', geographies)
    let townFilter = new FilterTown('Город', regionFilter)
    this.filters.push(regionFilter, townFilter)
    return this
  }
}