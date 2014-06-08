/* jshint node: true */
'use strict';

var Stats = require('../helpers/stats'),
    Images = require('../helpers/images'),
    Comments = require('../helpers/comments'),
    async = require('async');

module.exports = function(viewModel, callback){

    async.parallel([
        function(next) {
            Stats(next);
        },
        function(next) {
            Images.popular(next);
        },
        function(next) {
            Comments.newest(next);
        }
    ], function(err, results){
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(viewModel);
    });
};
