// Import necessary modules from nodemailer
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

// Import the server information interface
import { IServerInfo } from "./serverInfo";

// Define a class for handling SMTP functionality
export class Worker {
  // Static property to store server information
  private static serverInfo: IServerInfo;

  // Constructor that sets the server information during object creation
  constructor(inServerInfo: IServerInfo) {
    // Set the server information for the entire class
    Worker.serverInfo = inServerInfo;
  }

  // Method for sending an email
  public sendMessage(inOptions: SendMailOptions): Promise<void> {
    // Return a Promise for asynchronous handling
    return new Promise((inResolve, inReject) => {
      // Create a nodemailer transporter with the SMTP configuration
      const transport: nodemailer.Transporter = nodemailer.createTransport(Worker.serverInfo.smtp);

      // Use the transporter to send the email with provided options
      transport.sendMail(inOptions, (inError: Error | null, inInfo: SentMessageInfo) => {
        // Check for errors during the email sending process
        if (inError) {
          // Reject the Promise with the encountered error
          inReject(inError);
        } else {
          // Resolve the Promise if the email is sent successfully
          inResolve();
        }
      });
    });
  }
}
