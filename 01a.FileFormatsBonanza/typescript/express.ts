import express, { Request, Response } from 'express';
import { readUserFromJson, readUserFromXml, readUserFromYaml } from './read-files';

const app = express();

const jsonFilePath: string = "../../user.json"
const xmlFilePath: string = "../../user.xml"
const yamlFilePath: string = "../../user.yaml"
const csvFilePath: string = "../../user.csv"
const txtFilePath: string = "../../user.txt"

app.use(express.json());

app.get('/json', (req: Request, res: Response) => {
    var UsersFromJson = readUserFromJson(jsonFilePath);
    res.send(UsersFromJson);
});

app.get('/xml', async (req: Request, res: Response) => {
    var UsersFromXml = await readUserFromXml(xmlFilePath);
    res.send(UsersFromXml);
});

app.get('/yaml', (req: Request, res: Response) => {
    var UsersFromYaml = readUserFromYaml(yamlFilePath);
    res.send(UsersFromYaml);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})