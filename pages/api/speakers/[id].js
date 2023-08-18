import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve(), ms));

export default async function handler(req, res) {
    const jsonFile = path.resolve('./', 'db.json');
    const method = req?.method;
    const id = parseInt(req?.query?.id);
    const speakerPayload = req?.body;

    if(method !== 'PUT') {
        return res.status(501).send(`${method} not implemented`)
    }
    try {
       const readFileData = await readFile(jsonFile);
       delay(1000);
       const speakers = JSON.parse(readFileData).speakers;
        if (!speakers) {
         return res.status(404).send('Error: no speakers data found')
        } else {
         const updatedSpeakersArray = speakers.map((speaker) => (speaker.id === id ? speakerPayload : speaker));
         writeFile(jsonFile, JSON.stringify({speakers: updatedSpeakersArray}, null, 2));
         return res.status(200).send(JSON.stringify(speakerPayload, null, 2));
        }
    } catch (error) {
        console.log(`Error PUT: /api/speakers/${id} `, error);
    }
} 