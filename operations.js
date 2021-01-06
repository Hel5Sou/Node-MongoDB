// return mean than we can use the promise based approach and now we will be refactoring the index.js to use promises

exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
   return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};