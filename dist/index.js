"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nedb_1 = __importDefault(require("nedb"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const port = 3000;
// NeDB example
const db = new nedb_1.default({ filename: 'path/to/database.db', autoload: true });
// Nodemailer example
const transporter = nodemailer_1.default.createTransport({
    host: 'your-smtp-host',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password'
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
