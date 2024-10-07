// Import the 'path' module for working with file paths
import * as path from "path";

// Import the NeDB module
const Datastore = require("nedb");

// Define an interface for a contact
export interface IContact {
  _id?: number; // NeDB will automatically populate this when adding a contact
  name: string;
  email: string;
}

// Define a class for handling contacts functionality
export class Worker {
  private db: any; // NeDB Datastore

  // Constructor to initialize the NeDB Datastore
  constructor() {
    // Create a NeDB Datastore object with a specific file path and autoload set to true
    this.db = new Datastore({
      filename: path.join(__dirname, "contacts.db"), // Assuming the file is in the same directory as this script
      autoload: true,
    });
  }

  // Method to list all contacts
  public listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      // Use the find method of NeDB to retrieve all contacts
      this.db.find({}, (inError: Error | null, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError); // Reject the Promise if there's an error
        } else {
          inResolve(inDocs); // Resolve the Promise with the list of contacts
        }
      });
    });
  }

  // Method to add a new contact
  public addContact(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      // Use the insert method of NeDB to add a new contact
      this.db.insert(inContact, (inError: Error | null, inNewDoc: IContact) => {
        if (inError) {
          inReject(inError); // Reject the Promise if there's an error
        } else {
          inResolve(inNewDoc); // Resolve the Promise with the added contact
        }
      });
    });
  }

  // Method to delete a contact by ID
  public deleteContact(inID: string): Promise<void> {
    return new Promise((inResolve, inReject) => {
      // Use the remove method of NeDB to delete a contact by ID
      this.db.remove({ _id: inID }, {}, (inError: Error | null, inNumRemoved: number) => {
        if (inError) {
          inReject(inError); // Reject the Promise if there's an error
        } else {
          inResolve(); // Resolve the Promise when the contact is successfully deleted
        }
      });
    });
  }
}
