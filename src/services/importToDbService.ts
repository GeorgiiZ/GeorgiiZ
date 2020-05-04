import path from 'path';
import { DBInput, FileReader } from '../interfaces/interfaces';
import MonumentsMapping from "../services/MonumentsMapping";

const debug = require('debug')('app:importFromFileController');

async function importMonuments(dbManager: DBInput, fileReader: FileReader) {
    const monuments = await fileReader.readMonuments();
    const monumentsMapped = mapMonuments(monuments);
    await dbManager.insertMany('monuments', monumentsMapped);
}

function mapMonuments(monuments: Array<any>) {
    return monuments.map((monument: any) => {
        const {
            nativeId,
            nativeName,
            region,
            photo,
            address
        } = MonumentsMapping.mapOpenDataMonument(monument);

        const town = getTownName(address?.fullAddress);

        return {
            nativeId : nativeId?.trim(),
            nativeName: nativeName?.trim(),
            region: region,
            photo: photo,
            town: town?.trim()
        }
    });
}

function getTownName(fullAddress: string){
    if(!fullAddress)
        return null;
    const addressParts = fullAddress?.split(',');
    let town = addressParts.find(item => isTownName(item.trim())) || null;

    return town;
}

// function getPureTownName(town: any){
//     if(!town)
//         return null;
//     let result = town.replace('.', ' ');
//     result = result.replace(/\s\s+/g, ' '); // replace multi spaces with one space
//     result = result.split(' ')[1];
//     return result;
// }

function isTownName(town: string): boolean{
    const prefix = town[0];
    return <boolean>(
        town && (prefix === 'г'
            || prefix === 'с'
            || prefix === 'д'
            || prefix === 'о'
            || prefix === 'п'
            || prefix === 'р'
        )
    );
}

export { importMonuments }
