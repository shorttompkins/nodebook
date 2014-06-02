var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/mongotest', function(err, db) {
    console.log('Connected to MongoDB!');

    var collection = db.collection('testing');
    collection.insert({'title': 'Snowcrash'}, function(err, docs) {
        console.log(docs.length + ' records inserted.');
        console.log(docs[0]._id + ' - ' + docs[0].title);

        collection.findOne({title: 'Snowcrash'}, function(err, doc) {
            console.log(doc._id + ' - ' + doc.title);
        });
    });
});

