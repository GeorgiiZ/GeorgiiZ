interface DBInput {
    insertMany(items : Array<any>, collection: string): Promise<void>;
}

interface DBReader {
    findDocuments(collection: string, limit?: number): Promise<any>;
}

interface FileReader {
    getMonuments(filePath: string): Promise<Array<any>>;
}

export {
    DBInput,
    FileReader,
    DBReader
}
