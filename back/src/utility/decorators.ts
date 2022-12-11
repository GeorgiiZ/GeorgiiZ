function contextSaveDecor(func: Function, context: any){
    return function(){
        const result = func.call(context, ...arguments);
        return result;
    }
}

const defaultErrorMsg = "Something went wrong..."

function requestErrorHandler(fn: Function, message: string = defaultErrorMsg){
    return async function (req: any, res: any) {
        try {
            await fn(req, res);
        } catch(err){
            res.status(500).send(message)
        }
    }
}

export {
    contextSaveDecor,
    requestErrorHandler
}
