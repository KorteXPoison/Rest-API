"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const serverInfo_1 = require("./server/serverInfo");
const SMTP = __importStar(require("./server/SMTP"));
const Contacts = __importStar(require("./server/contacts"));
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use(express_1.default.json());
app.use(" / ", express_1.default.static(path_1.default.join(__dirname, " ../../ client / dist ")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header(" Access - Control - Allow - Origin ", " * ");
    inResponse.header(" Access - Control - Allow - Methods ", " GET , POST , DELETE , OPTIONS ");
    inResponse.header(" Access - Control - Allow - Headers ", " Origin ,X - Requested - With , Content - Type , Accept ");
    inNext();
});
app.post(" / messages ", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const smtpWorker = new SMTP.Worker(serverInfo_1.serverInfo);
        yield smtpWorker.sendMessage(inRequest.body); // object created by express . json middleware
        inResponse.send(" ok ");
    }
    catch (inError) {
        inResponse.send(" error ");
    }
}));
app.get(" / contacts ", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        const contacts = yield contactsWorker.listContacts();
        inResponse.json(contacts); // serialize object into JSON
    }
    catch (inError) {
        inResponse.send(" error ");
    }
}));
app.post(" / contacts ", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        const contact = yield contactsWorker.addContact(inRequest.body);
        inResponse.json(contact); // for client acknowledgment and future use ( includes ID )
    }
    catch (inError) {
        inResponse.send(" error ");
    }
}));
app.delete(" / contacts /: id ", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactsWorker = new Contacts.Worker();
        yield contactsWorker.deleteContact(inRequest.params.id);
        inResponse.send(" ok ");
    }
    catch (inError) {
        inResponse.send(" error ");
    }
}));
app.listen(8080);
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
