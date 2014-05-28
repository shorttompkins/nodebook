/* jshint node: true, camelcase: false */
'use strict';

var models = require('../helpers/models'),
    path = require('path'),
    fs = require('fs'),
    md5 = require('MD5'),
    sidebar = require('../helpers/sidebar');

module.exports = {
    index: function(req, res) {
        var viewModel = {
            comments: []
        };
        models.Image.find({ filename: { $regex: req.params.image_id } },
            function(err, images) {
                if (err) throw err;
                if (images.length > 0) {

                    // build the view model - include the image, comments, etc.
                    viewModel.image = images[0];

                    viewModel.image.views = viewModel.image.views + 1;
                    viewModel.image.uniqueId = req.params.image_id;

                    models.Comment.find(
                        { image_id: images[0]._id},
                        {},
                        { sort: { 'timestamp': 1 }},
                        function(err, comments){
                            viewModel.comments = comments;
                            sidebar(viewModel, function(err, viewModel) {
                                res.render('image', viewModel);
                            });
                        }
                    );

                    // increment the views counter:
                    models.Image.update({ _id: images[0]._id },{ $inc: { 'views': 1} });
                } else {
                    res.redirect('/');
                }
            });
    },
    create: function(req, res) {
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            models.Image.find({ filename: imgUrl }, function(err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
                    var tempPath = req.files.file.path,
                        ext = path.extname(req.files.file.name).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) throw err;

                            var newImg = new models.Image({
                                title: req.body.title,
                                filename: imgUrl + ext,
                                description: req.body.description
                            });
                            newImg.save(function(err, image) {
                                console.log('Successfully inserted image: ' + image.filename);
                                res.redirect('/images/' + image.uniqueId);
                            });
                        });
                    } else {
                        fs.unlink(tempPath, function () {
                            if (err) throw err;

                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            });
        };

        saveImage();
    },
    like: function(req, res) {
        models.Image.findOne({ filename: { $regex: req.params.image_id } },
            function(err, image) {
                image.likes = image.likes + 1;
                image.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ likes: image.likes });
                    }
                });
            });
    },
    comment: function(req, res) {
        models.Image.findOne({ filename: { $regex: req.params.image_id } },
            function(err, image) {
                var newComment = new models.Comment(req.body);
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save(function(err, comment) {
                    if (err) throw err;

                    res.redirect('/images/' + image.uniqueId + '#' + comment._id);
                });
            });
    },
    remove: function(req, res) {
        models.Image.findOne({ filename: { $regex: req.params.image_id } },
            function(err, image) {
                if (err) throw err;
                res.redirect('/images/' + image.uniqueId + '#' + comment._id);
            });
        });
    }
};
