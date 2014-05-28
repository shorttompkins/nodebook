/* jshint node: true */
'use strict';

var models = require('../models'),
    async = require('async');

module.exports = function(callback) {

    async.parallel([
        function(callback) {
            models.Image.count({}, function(err, total){
                callback(null, total);
            });
        },
        function(callback) {
            models.Comment.count({}, function(err, total){
                callback(null, total);
            });
        },
        function(callback) {
            models.Image.aggregate({ $group : {
                _id : '1',
                viewsTotal : { $sum : '$views' }
            }}, function(err, result){
                callback(null, result[0].viewsTotal);
            });
        },
        function(callback) {
            models.Image.aggregate({ $group : {
                _id : '1',
                likesTotal : { $sum : '$likes' }
            }}, function(err, result){
                callback(null, result[0].likesTotal);
            });
        }
    ], function(err, results){
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    });
};
