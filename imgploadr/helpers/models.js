/* jshint node: true, camelcase: false */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    path = require('path'),
    moment = require('moment');


var Img = new Schema({
    title:          { type: String },
    description:    { type: String },
    filename:       { type: String },
    views:          { type: Number, 'default': 0 },
    likes:          { type: Number, 'default': 0 },
    timestamp:      { type: Date, 'default': Date.now }
});

Img.virtual('uniqueId').get(function() {
    return this.filename.replace(path.extname(this.filename), '');
});



var Comment = new Schema({
    image_id:   { type: ObjectId },
    email:      { type: String },
    name:       { type: String },
    gravatar:   { type: String },
    comment:    { type: String },
    timestamp:  { type: Date, 'default': Date.now }
});

Comment.virtual('timestampAgo').get(function() {
    return moment(this.timestamp).startOf('minute').fromNow();
});
Comment.virtual('image').set(function(image){
    this._image = image;
}).get(function() {
    return this._image;
});



module.exports = {
    Comment: mongoose.model('Comment', Comment),
    Image: mongoose.model('Image', Img)
};
