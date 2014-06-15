var MongoClient = require('mongodb').MongoClient;
 
var dbhost = 'mongodb://localhost:27017/test',
    myCollection = 'chapter2';
 
var seedData = function(db, callback) {
    db.collection(myCollection).find({}, {}, {})
        .toArray(
            function(err, docs) {
                if (docs.length <= 0) {
                    console.log('No data. Seeding...');
 
                    var ihandler = function(err, recs) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        inserted++;
                    }
 
                    var toinsert = 5,
                        inserted = 0;
 
                    db.collection(myCollection).insert({
                        'Title': 'Snow Crash',
                        'Author': 'Neal Stephenson'
                    }, ihandler);
                    db.collection(myCollection).insert({
                        'Title': 'Neuromancer',
                        'Author': 'William Gibson'
                    }, ihandler);
                    db.collection(myCollection).insert({
                        'Title': 'Breach',
                        'Author': 'Patrick Lee'
                    }, ihandler);
                    db.collection(myCollection).insert({
                        'Title': 'Remaining, The',
                        'Author': 'D.J. Molles'
                    }, ihandler);
                    db.collection(myCollection).insert({
                        'Title': 'CyberStorm',
                        'Author': 'Matthew Mather'
                    }, ihandler);
 
                    var sync = setInterval(function(){
                        if(inserted === toinsert) {
                            clearInterval(sync);
                            callback(db);
                        }
                    }, 50);
                    return;
                }
                callback(db);
                return;
            }
        );
}
 
var showDocs = function(db) {
    console.log("Listing books:");
    var options = {
        sort: [['Title',1]]
    };
    db.collection(myCollection).find({}, {}, options)
        .toArray(
            function(err, docs) {
                if (err) throw err;
 
                for(var d = 0; d < docs.length; d++) {
                    console.log(docs[d].Title + '; ' + docs[d].Author);
                }
 
                db.close();
            }
    );
}
 
MongoClient.connect(dbhost, function(err, db){
    if (err) throw err;
 
    seedData(db, showDocs);
});