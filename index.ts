import bodyParser from 'body-parser';
import express from "express";
import {HostelsModel} from "./hostels.model";

const admin = require('firebase-admin');
const serviceAccount = require('../cle.json'); //bug path node
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cambrai-59400.firebaseio.com"
});

const db = admin.firestore();

app.use(bodyParser());

app.get('/hostels', async (req, res) => {
    const ref = db.collection('hostels');
    const hostels: HostelsModel[] = [];
    const hostelsref = await ref.get();
    hostelsref.forEach((value: { data: () => HostelsModel; }) => hostels.push(value.data() as HostelsModel));
    res.send(hostels)
});

app.post('/add/hostels', async (req, res) => {
    const ref = db.collection('hostels');
    const hostel: HostelsModel[] = req.body;
    await ref.add(hostel);
    res.send(hostel)
});

app.delete('/delete/:id', async (req, res) => {
    const ref = db.collection('hostels').doc(req.params.id);
    await ref.delete();
    res.send()
});

app.put('/update/:id', async (req, res) => {
    const ref = db.collection('hostels').doc(req.params.id);
    await ref.set(req.body);
    res.send()
});

app.patch('/update/:id', async (req, res) => {
    const ref = db.collection('hostels').doc(req.params.id);
    await ref.update(req.body);
    res.send()
});

app.listen(4000, () => {
    console.log('Complete on port 4000!')
});

