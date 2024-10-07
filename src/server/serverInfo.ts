// Import the 'path' and 'fs' modules for working with file paths and reading files
import path from 'path';
import fs from 'fs';

// Define an interface for SMTP information
export interface ISmtpInfo {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

// Define an interface for server information, containing SMTP information
export interface IServerInfo {
  smtp: ISmtpInfo;
}

// Declare a variable to store server information
export let serverInfo: IServerInfo;

// Read server information from a JSON file
// Note: This assumes the file is located in the '../server/' directory and named 'serverInfo.json'
const rawInfo: string = fs.readFileSync(path.join(__dirname, '../server/serverInfo.json'), 'utf8');

// Parse the raw JSON data and assign it to the 'serverInfo' variable
serverInfo = JSON.parse(rawInfo);
