/* global describe, beforeEach, sinon, it, expect */
/* jshint node:true */
'use strict';

var proxyquire = require('proxyquire'),
    callback = sinon.spy(),
    sidebarStub = sinon.stub(),
    ImageModelStub = { Image: {} },
    home = proxyquire('../../controllers/home', {
        '../helpers/sidebar': sidebarStub,
        '../models': ImageModelStub
    }),
    res = {},
    req = {};

describe('Home Controller', function(){
    describe('Index', function(){
        beforeEach(function() {
            res = {
                render: sinon.spy()
            };
        });
        it('should be defined', function(){
            expect(home.index).to.be.defined;
        });
        it('should call ImageModel.find', function(){
            ImageModelStub.Image.find = sinon.spy();
            home.index(req, res);
            expect(ImageModelStub.Image.find).to.be.called;
        });
        it('should find all Images sorted by descending timestamp', function(){
            ImageModelStub.Image.find = sinon.spy();
            home.index(req, res);
            expect(ImageModelStub.Image.find).to.be.calledWith({},{},{ sort: { timestamp: -1 }}, sinon.match.func);
        });
        it('should execute sidebar', function(){
            ImageModelStub.Image.find = sinon.stub().callsArgWith(3, null, [1,2,3]);
            home.index(req, res);
            expect(sidebarStub).to.be.calledWith({images: [1,2,3]}, sinon.match.func);
        });
        it('should execute sidebar callback with found images', function(){
            ImageModelStub.Image.find = sinon.stub().callsArgWith(3, null, [1,2,3]);
            sidebarStub.callsArgWith(1, {images: [1,2,3]});
            home.index(req, res);
            expect(res.render).to.be.calledWith('index', {images: [1,2,3]});
        });
    });
});
