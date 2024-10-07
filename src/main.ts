// Import necessary modules
import Datastore from 'nedb';
import nodemailer from 'nodemailer';
import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

// Import server configurations and modules
import { serverInfo } from "./server/serverInfo";
import * as SMTP from "./server/SMTP";
import * as Contacts from "./server/contacts";
import { IContact } from "./server/contacts";

// Set up the Express app and define the port
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app: Express = express();
app.use(express.json());

// Serve static files from the client/dist directory
app.use('/', express.static(path.join(__dirname, '../../client/dist')));

// Enable CORS headers
app.use((inRequest: Request, inResponse: Response, inNext: NextFunction) => {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  inNext();
});

// Define API endpoints

// Endpoint for sending emails
app.post("/messages", async (inRequest: Request, inResponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(inRequest.body);
    inResponse.send("ok");
  } catch (inError) {
    inResponse.send("error");
  }
});

// Endpoint for listing contacts
app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    inResponse.json(contacts);
  } catch (inError) {
    inResponse.send("error");
  }
});

// Endpoint for adding a contact
app.post("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(inRequest.body);
    inResponse.json(contact);
  } catch (inError) {
    inResponse.send("error");
  }
});

// Endpoint for deleting a contact
app.delete("/contacts/:id", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    await contactsWorker.deleteContact(inRequest.params.id);
    inResponse.send("ok");
  } catch (inError) {
    inResponse.send("error");
  }
});

// Listen on port 8080
app.listen(8080);

// NeDB example (database initialization)
const db = new Datastore({ filename: 'path/to/database.db', autoload: true });

// Nodemailer example (transporter setup)
const transporter = nodemailer.createTransport({
  host: 'your-smtp-host',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
