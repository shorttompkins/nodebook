/* jshint node: true */
'use strict';

var sidebar = require('../helpers/sidebar'),
    Images = require('../helpers/images');

module.exports = {
    index: function(req, res) {

        var viewModel = {
            images: {}
        };

        Images.newest(function(err, images) {
            viewModel.images = images;
            sidebar(viewModel, function(err, viewModel) {
                res.render('index', viewModel);
            });
        });
    }
};
