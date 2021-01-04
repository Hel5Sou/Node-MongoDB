const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true}, (err, client) => {
//connect method in order to create connection to the mongo server and access the campsites database

    assert.strictEqual(err, null); //if it fails it will throw an error argument like if err === null than quit if not, continue

    console.log('Connected correctly to server');

    const db = client.db(dbname); // drop = delete - be careful!

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => { //be able to print all and we have here 2 callbacks - insertOne and this but we can do it because it's asynchronous function
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs)

                client.close(); // close app if any issues appeared
            });
        });
    });
});