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

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mongotest');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});

var Account = new Schema({
    username: { type: String },
    date_created: { type: Date, default: Date.now },
    visits: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    age: { type: Number, required: true, min: 13, max: 120 }
});

Account.statics.findByAgeRange = function(min, max, callback) {
    this.find({ age: { $gt : 18, $lte : 30} }, callback);
};

Account.virtual('fullname').get(function() {
    return this.firstname + ' '  + this.lastname;
}).set(function(fullname) {
    var parts = fullname.split(' ');
    this.firstname = parts[0];
    this.lastname = parts[1];
});

var AccountModel = mongoose.model('Account', Account);
var newUser = new AccountModel({  username: 'randomUser', age: 11 });
newUser.validate(function(err) {
    console.log(err);
});

var AccountModel = mongoose.model('Account', Account);
var newUser = new AccountModel({ username: 'randomUser', age: 21 });
newUser.save();
var newUser2 = new AccountModel({ username: 'randomUser2', age: 25 });
newUser2.save();
var newUser3 = new AccountModel({ username: 'randomUser3', age: 18 });
newUser3.save();
var newUser4 = new AccountModel({ username: 'randomUser4', age: 32 });
newUser4.save();

AccountModel.find({ age: { $gt : 18, $lte : 30} }, function(err, accounts){
    console.log(accounts.length);
    mongoose.connection.close();
});

AccountModel.findByAgeRange(18, 30, function(err, accounts){
    console.log(accounts.length);
});




