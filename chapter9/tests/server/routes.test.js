/* global describe, beforeEach, sinon, it, expect */
/* jshint node:true */
'use strict';

var home = require('../../controllers/home'),
    image = require('../../controllers/image'),
    routes = require('../../server/routes');

describe('Routes', function(){
    var app = {
        get: sinon.spy(),
        post: sinon.spy(),
        delete: sinon.spy()
    };
    beforeEach(function(){
        routes.initialize(app);
    });
    describe('GETs', function() {
        it('should handle /', function(){
            expect(app.get).to.be.calledWith('/', home.index);
        });
        it('should handle /images/:image_id', function(){
            expect(app.get).to.be.calledWith('/images/:image_id', image.index);
        });
    });
    describe('POSTs', function() {
        it('should handle /images', function(){
            expect(app.post).to.be.calledWith('/images', image.create);
        });
        it('should handle /images/:image_id/like', function(){
            expect(app.post).to.be.calledWith('/images/:image_id/like', image.like);
        });
        it('should handle /images/:image_id/comment', function(){
            expect(app.post).to.be.calledWith('/images/:image_id/comment', image.comment);
        });
    });
    describe('DELETEs', function() {
        it('should handle /images/:image_id', function(){
            expect(app.delete).to.be.calledWith('/images/:image_id', image.remove);
        });
    });
});
