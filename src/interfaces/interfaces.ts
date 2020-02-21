interface DBInput {
    insertMany(items : Array<any>, collection: string): Promise<void>;
}

interface DBReader {
    findDocuments(collection: string, filter: Object|undefined, limit: number): Promise<any>;
}

interface FileReader {
    getMonuments(filePath: string): Promise<Array<any>>;
}

export {
    DBInput,
    FileReader,
    DBReader
}
