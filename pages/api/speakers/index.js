import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve(), ms));

export default async function handler(req, res) {
  const jsonFile = path.resolve('./', 'db.json');
  try {
    const readFileData = await readFile(jsonFile);
    delay(1000);
    const speakers = JSON.parse(readFileData).speakers;
    if (!speakers) {
      return res.status(404).send('Error: no speakers data found');
    } else {
      console.log('GET: /api/speakers 200 OK');
      return res.status(200).send(JSON.stringify(speakers, null, 2));
    }
  } catch (error) {
    console.log('Error GET: /api/speakers ', error);
  }
}
