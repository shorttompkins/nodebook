/* jshint node: true */
'use strict';

var models = require('./models'),
    path = require('path');

module.exports = {
    newest: function(callback) {
        models.Image.find({}, {}, { sort: { timestamp: -1 }}, function(err, images) {
            if (err) throw err;

            callback(null, images);
        });
    },
    popular: function(callback) {
        models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }}, function(err, images) {
            if (err) throw err;

            callback(null, images);
        });
    }
};
