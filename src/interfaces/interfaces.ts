interface DBInput {
    insertMany(items : Array<any>, collectionName: string): Promise<void>;
}

interface FileReader {
    getMonuments(filePath: string): Promise<Array<any>>;
}

export {
    DBInput,
    FileReader
}
