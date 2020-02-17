import path from 'path';
import { DBInput, FileReader } from '../interfaces/interfaces';


const debug = require('debug')('app:importFromFileController');

async function importMonuments(dbManager: DBInput, fileReader: FileReader){
    for(let i = 1; i < 16; i++ ){
        const filePath = path.join(__dirname, `../../assets/${ i }.json`);
        const monuments = await fileReader.getMonuments(filePath);
        const monumentsNew = mapMonuments(monuments);
        await dbManager.insertMany(monumentsNew, 'monuments_1');
    }
}

function mapMonuments(monuments: Array<any>) {
    return monuments.map((monument: any) => {
        const { nativeId, nativeName, data: { general: { region } } } = monument;
        return {
            nativeId,
            nativeName,
            region
        }
    });
}



export { importMonuments }
