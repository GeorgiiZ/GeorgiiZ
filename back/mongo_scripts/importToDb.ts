import { importMonuments } from '../src/services/importToDbService';
import TextFileManager from '../src/services/TextFileManager';
import MongoService from '../src/services/MongoService';
import path from 'path';

const mongoManager = new MongoService();

async function importData() {
  for (let i = 1; i < 16; i++) {
    const filePath = path.join(__dirname, `../assets/${i}.json`);
    const textFileManager = new TextFileManager(filePath);
    await importMonuments(mongoManager, textFileManager);
  }
}

importData().then(() => console.log('Loading monuments finished!'));
