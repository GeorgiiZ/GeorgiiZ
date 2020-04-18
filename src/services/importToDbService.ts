import path from 'path';
import { DBInput, FileReader } from '../interfaces/interfaces';

const debug = require('debug')('app:importFromFileController');

async function importMonuments(dbManager: DBInput, fileReader: FileReader){
    const monuments = await fileReader.readMonuments();
    const monumentsMapped = mapMonuments(monuments);
    await dbManager.insertMany('monuments', monumentsMapped);
}

function mapMonuments(monuments: Array<any>) {
    return monuments.map((monument: any) => {
        const {
            nativeId,
            nativeName,
            data: {
                general: {
                    region,
                    photo
                }
            }
        } = monument;
        return {
            nativeId,
            nativeName,
            region,
            photo
        }
    });
}

export { importMonuments }
