var admin = require('firebase-admin');
var serviceAccount = require('./cle');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cambrai-59400.firebaseio.com"
});
var db = admin.firestore();
//# sourceMappingURL=index.js.map