import { FileReader } from '../interfaces/interfaces';
import util from "util";
import fs from "fs";

export default class TextFileManager implements FileReader{
    filePath: string;

    constructor(filePath: string){
        this.filePath = filePath;
    }

    async readMonuments(): Promise<Array<any>>{
        const readFile = util.promisify(fs.readFile);
        const monumentsStr = await readFile(this.filePath, "utf8");
        return JSON.parse(monumentsStr);
    }
}
