const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    //connect method in order to create connection to the mongo server and access the campsites database
    console.log('Connected correctly to server');

    const db = client.db(dbname); // drop = delete - be careful!
    // using promises for this chain to avoid the CallBack Hell - waiting again one promise to another but in much cleaner and more logical way 
    db.dropCollection('campsites')
        .then(result => {
            console.log('Dropped Collection:', result);
        })
        .catch(err => console.log('No collection to drop.'));

    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
        .then(result => {
            console.log('Insert Document:', result.ops);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                { description: "Updated Test Description" }, 'campsites');
        })
        .then(result => {
            console.log('Updated Document Count:', result.result.nModified);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                'campsites');
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);

            return client.close();
        })
        .catch(err => { // stright from the catch block where was the err
            console.log(err);
            client.close();
        });
})
    .catch(err => console.log(err));