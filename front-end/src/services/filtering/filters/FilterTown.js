export class FilterTown {
  constructor(name, regionFilter) {
    this.name = name
    this.regionFilter = regionFilter
    this.selectedValue = null
  }


  getValueKey () {
    return null
  }

  setSelectedValue (value) {
    this.selectedValue = value
  }

  getSelectedValue () {
    return this.selectedValue ?? 'Все'
  }

  getValues () {
    return this.regionFilter.selectedValue?.towns ?? []
  }

  getAPIFilter () {
    let result = ''
    if (this.selectedValue) {
      result = `filter[town]=${this.selectedValue}`
    }
    return result
  }
}
