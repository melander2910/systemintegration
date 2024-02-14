import fs from 'fs'
import xml2js from 'xml2js'
import yaml from 'js-yaml'
import {parse} from 'csv-parse'

import { User } from './user';
import { Client } from './client';
import { TimeTracking } from './time-trackings';

const jsonFilePath: string = "../../user.json"
const xmlFilePath: string = "../../user.xml"
const yamlFilePath: string = "../../user.yaml"
const csvFilePath: string = "../../user.csv"
const txtFilePath: string = "../../user.txt"


function readUserFromJson(filePath: string): User {
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let user: User = JSON.parse(jsonData);
    return user;
}

async function readUserFromXml(filePath: string): Promise<User> {
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
    return user;
}

function readUserFromYaml(filePath: string): User {
    let yamlData = fs.readFileSync(filePath, 'utf-8');
    let user: User = yaml.load(yamlData) as User;
    return user;
}

function readUserFromCsv(filePath: string): string {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    // TODO: use csv parser, but how do i figure out which are the nested objects?
    return csvData;
}

function readUserFromTxt(filePath: string): User {
    let jsonData = fs.readFileSync(filePath, 'utf-8');
    let user: User = JSON.parse(jsonData);
    return user;
}

export {readUserFromJson, readUserFromXml, readUserFromCsv, readUserFromYaml, readUserFromTxt}

// readUserFromJson(jsonFilePath);
// readUserFromXml(xmlFilePath);
// readUserFromYaml(yamlFilePath);
// readUserFromCsv(csvFilePath);
// readUserFromTxt(txtFilePath);



