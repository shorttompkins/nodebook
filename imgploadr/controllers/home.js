/* jshint node: true */
'use strict';

var sidebar = require('../helpers/sidebar'),
    Images = require('../helpers/images');

module.exports = {
    index: function(req, res) {

        var viewModel = {
            images: {}
        };

        sidebar(viewModel, function(err, viewModel) {
            Images.newest(function(err, images) {
                viewModel.images = images;
                res.render('index', viewModel);
            });
        });
    }
};
