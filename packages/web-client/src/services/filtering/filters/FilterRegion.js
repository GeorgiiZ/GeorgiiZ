import {compareFn} from "@/shared/utils";

export class FilterRegion {

  constructor(name, geographies) {
    this.name = name
    this.geographies = geographies
    this.selectedValue = null
  }

  getValueKey () {
    return 'region'
  }

  setSelectedValue (value) {
    this.selectedValue = value
  }

  getSelectedValue () {
    return this.selectedValue ?? 'Все'
  }

  clear () {
    this.selectedValue = null
  }

  getValues () {
    return this.geographies
  }

  getAPIFilter () {
    let result = ''
    if (this.selectedValue) {
      result = `filter[region]=${this.selectedValue.region}`
    }
    return result
  }
}
