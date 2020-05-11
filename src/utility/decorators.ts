function contextSaveDecor(func: Function, context: any){
    return function(){
        const result = func.call(context, ...arguments);
        return result;
    }
}

export {
    contextSaveDecor
}
