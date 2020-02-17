import { FileReader } from '../interfaces/interfaces';
import util from "util";
import fs from "fs";

export default class TextFileManager implements FileReader{
    async getMonuments(filePath: string): Promise<Array<any>>{
        const readFile = util.promisify(fs.readFile);
        const monumentsStr = await readFile(filePath, "utf8");
        return JSON.parse(monumentsStr);
    }
}
