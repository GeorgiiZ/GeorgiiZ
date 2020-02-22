import { QueryFilter, RegionFilter } from './QueryFilter';

const debug = require('debug')('app:QueryFilterFactory');

class QueryFilterFactory{

    static setupFilter(filterRequest: any): Object | undefined{
        if(!filterRequest){
            return {}
        }
        let filter = {};
        Object.keys(filterRequest).forEach((filtertype: string) => {
            const curFilter = this.setupFilterHelper(filtertype);
            const value = filterRequest[filtertype];
            filter = Object.assign(filter, curFilter?.getFilter(value));
        });
        return filter;
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
