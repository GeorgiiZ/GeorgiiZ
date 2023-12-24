import { QueryFilter, RegionFilter, TownFilter } from './QueryFilter';

const debug = require('debug')('app:QueryFilterFactory');

class QueryFilterFactory {
  static setupFilter(filterRequest: any): Object | undefined {
    if (!filterRequest) {
      return {};
    }
    let filter = {};
    Object.entries(filterRequest).forEach(([filterKey, filterValue]) => {
      const curFilter = this.setupFilterHelper(filterKey);
      filter = Object.assign(filter, curFilter?.getFilter(<string>filterValue));
    });
    return filter;
  }

  private static setupFilterHelper(filterKey: string): QueryFilter | null {
    switch (filterKey) {
      case 'region':
        return new RegionFilter();
      case 'town':
        return new TownFilter();
      default:
        return null;
    }
  }
}

export { QueryFilterFactory };
