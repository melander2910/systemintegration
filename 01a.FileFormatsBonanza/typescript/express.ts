import express, { Request, Response } from 'express';
import { readUserFromCsv, readUserFromJson, readUserFromTxt, readUserFromXml, readUserFromYaml } from './read-files';

const app = express();

const jsonFilePath: string = "../../user.json"
const xmlFilePath: string = "../../user.xml"
const yamlFilePath: string = "../../user.yaml"
const csvFilePath: string = "../../user.csv"
const txtFilePath: string = "../../user.txt"

app.use(express.json());

app.get('/xml', async (request, response) => {
    const res = await fetch("http://localhost:5050/xml");
    var data = await res.json();
    response.send(data);
});

app.get('/json', (req: Request, res: Response) => {
    var UserFromJson = readUserFromJson(jsonFilePath);
    res.send(UserFromJson);
});

app.get('/xml', async (req: Request, res: Response) => {
    var UserFromXml = await readUserFromXml(xmlFilePath);
    res.send(UserFromXml);
});

app.get('/yaml', (req: Request, res: Response) => {
    var UserFromYaml = readUserFromYaml(yamlFilePath);
    res.send(UserFromYaml);
});

app.get('/csv', (req: Request, res: Response) => {
    const usersFromCsv = readUserFromCsv(csvFilePath);
    res.json(usersFromCsv);
});

app.get('/txt', (req: Request, res: Response) => {
    var UsersFromTxt = readUserFromTxt(txtFilePath);
    res.send(UsersFromTxt);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})