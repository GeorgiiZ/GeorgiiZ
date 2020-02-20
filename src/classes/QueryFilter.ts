abstract  class QueryFilter{
    abstract getFilter(value: string): object;
}

class RegionFilter extends QueryFilter{

    getFilter(value: string){
        return {
            region: {
                value: value
            }
        };
    }
}

export{
    QueryFilter,
    RegionFilter
}
