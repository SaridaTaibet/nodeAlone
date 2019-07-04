"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const admin = require('firebase-admin');
const serviceAccount = require('../cle.json'); //bug path node
const app = express_1.default();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cambrai-59400.firebaseio.com"
});
const db = admin.firestore();
app.use(body_parser_1.default());
app.get('/hostels', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ref = db.collection('hostels');
    const hostels = [];
    const hostelsref = yield ref.get();
    hostelsref.forEach((value) => hostels.push(value.data()));
    res.send(hostels);
}));
app.post('/add/hostels', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ref = db.collection('hostels');
    const hostel = req.body;
    yield ref.add(hostel);
    res.send(hostel);
}));
app.delete('/delete/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ref = db.collection('hostels').doc(req.params.id);
    yield ref.delete();
    res.send();
}));
app.put('/update/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ref = db.collection('hostels').doc(req.params.id);
    yield ref.set(req.body);
    res.send();
}));
app.patch('/update/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ref = db.collection('hostels').doc(req.params.id);
    yield ref.update(req.body);
    res.send();
}));
app.listen(4000, () => {
    console.log('Complete on port 4000!');
});
//# sourceMappingURL=index.js.map