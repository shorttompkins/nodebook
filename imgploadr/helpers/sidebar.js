/* jshint node: true */
'use strict';

var Stats = require('../helpers/stats'),
    Images = require('../helpers/images'),
    Comments = require('../helpers/comments'),
    async = require('async');

module.exports = function(viewModel, callback){

    async.parallel([
        function(callback) {
            Stats(callback);
        },
        function(callback) {
            Images.popular(callback);
        },
        function(callback) {
            Comments.newest(callback);
        }
    ], function(err, results){
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(null, viewModel);
    });
};
