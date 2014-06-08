var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    index: function(req, res) {
        var viewModel = {
            images: {}
        };

        ImageModel.find({}, {}, { sort: { timestamp: -1 }},
            function(err, images) {
                if (err) { throw err; }

                viewModel.images = images;
                sidebar(viewModel, function(viewModel) {
                    res.render('index', viewModel);
                });
            });
    }
};
