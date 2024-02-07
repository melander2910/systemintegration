import fs from 'fs'
import xml2js from 'xml2js'
import yaml from 'js-yaml'
import {parse} from 'csv-parse'

import { User } from './user';

const jsonFilePath: string = "../../user.json"
const xmlFilePath: string = "../../user.xml"
const yamlFilePath: string = "../../user.yaml"
const csvFilePath: string = "../../user.csv"
const txtFilePath: string = "../../user.txt"


function readUserFromJson(filePath: string) {
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let user: User = JSON.parse(jsonData);
    console.log("JSON: ", user);
}

async function readUserFromXml(filePath: string){
    let xmlData = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser({explicitArray: false});
    let e = await parser.parseStringPromise(xmlData);
    let user: User = {
        id: e.root.id,
        firstname: e.root.firstname,
        lastname: e.root.lastname,
        email: e.root.email,
        clients: e.root.clients,
        timeTrackings: e.root.timeTrackings
    }
    console.log("XML: ", user);
}

function readUserFromYaml(filePath: string) {
    let yamlData = fs.readFileSync(filePath, 'utf-8');
    let user: User = yaml.load(yamlData) as User;
    console.log("YAML: ", user);
}

function readUserFromCsv(filePath: string) {
    const headers = ['Id','Firstname','Lastname','Email','Id','UserId','StartDate','EndDate','Title','Description','ClientId','ClientsId','UsersId','Id','Firstname','Lastname','PhoneNumber','Email','CompanyName']
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    
    const rows: User[] = []
    parse(csvData, {
        delimiter: ',',
        columns: headers,
    }, (error, result: User[]) => {
        console.log(result);
    }
    )
}

// txt file with json format
function readUserFromTxt(filePath: string) {
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let user: User = JSON.parse(jsonData);
    console.log("TXT: ", user);
}

readUserFromJson(jsonFilePath);
readUserFromXml(xmlFilePath);
readUserFromYaml(yamlFilePath);
readUserFromCsv(csvFilePath);
readUserFromTxt(txtFilePath);



