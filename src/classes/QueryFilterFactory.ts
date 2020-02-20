import { QueryFilter, RegionFilter } from './QueryFilter'

class QueryFilterFactory{
    static setupFilter(filterType: string): QueryFilter | null{
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
