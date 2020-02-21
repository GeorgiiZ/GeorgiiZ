import { QueryFilter, RegionFilter } from './QueryFilter';

const debug = require('debug')('app:QueryFilterFactory');

class QueryFilterFactory{

    static setupFilter(filterRequest: any): Object | undefined{
        const filter = this.setupFilterHelper('region');
        //     Object.keys(filterRequest).reduce((accumulator, filterType) => {
        //     const queryFilter = this.setupFilterHelper(filterType);
        //     const filteringValue = filterRequest[filterType];
        //     const curFilter = queryFilter?.getFilter(filteringValue);
        //     return Object.assign(accumulator, curFilter);
        // });
        const result = filter?.getFilter(filterRequest['region']);
        return result;
    }

    private static setupFilterHelper(filterType: string): QueryFilter | null {
        switch(filterType) {
            case 'region':
                return new RegionFilter();
                break;
            default:
                return null;
                break;
        };
    }
}

export {
    QueryFilterFactory
}
