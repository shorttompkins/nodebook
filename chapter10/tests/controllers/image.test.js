/* global describe, beforeEach, sinon, it, expect */
/* jshint node:true */
'use strict';

var proxyquire = require('proxyquire'),
    callback = sinon.spy(),
    sidebarStub = sinon.stub(),
    fsStub = {},
    pathStub = {},
    md5Stub = {},
    ModelsStub = {
        Image: {
            findOne: sinon.spy()
        },
        Comment: {
            find: sinon.spy()
        }
    },
    image = proxyquire('../../controllers/image', {
        '../helpers/sidebar': sidebarStub,
        '../models': ModelsStub,
        'fs': fsStub,
        'path': pathStub,
        'md5': md5Stub
    }),
    res = {},
    req = {},
    testImage = {};

describe('Image Controller', function(){
    beforeEach(function() {
        res = {
            render: sinon.spy(),
            json: sinon.spy(),
            redirect: sinon.spy()
        };
        req.params = {
            image_id: 'testing'
        };
        testImage = {
            _id: 1,
            title: 'Test Image',
            views: 0,
            likes: 0,
            save: sinon.spy()
        };
    });
    describe('Index', function(){
        it('should be defined', function(){
            expect(image.index).to.be.defined;
        });
        it('should call Models.Image.findOne', function(){
            ModelsStub.Image.findOne = sinon.spy();
            image.index(req, res);
            expect(ModelsStub.Image.findOne).to.be.called;
        });
        it('should find Image by parameter id', function(){
            ModelsStub.Image.findOne = sinon.spy();
            image.index(req, res);
            expect(ModelsStub.Image.findOne).to.be.calledWith(
                { filename: { $regex: 'testing' } }, sinon.match.func);
        });
        describe('with found image model', function() {
            beforeEach(function(){
                ModelsStub.Image.findOne =
                    sinon.stub().callsArgWith(1,null,testImage);
            });
            it('should incremement views by 1 and save', function(){
                image.index(req, res);
                expect(testImage.views).to.equal(1);
                expect(testImage.save).to.be.called;
            });
            it('should find related comments', function(){
                image.index(req, res);
                expect(ModelsStub.Comment.find).to.be.calledWith(
                    {image_id: 1},
                    {},
                    { sort: { 'timestamp': 1 }},
                    sinon.match.func
                );
            });
            it('should execute sidebar', function(){
                ModelsStub.Comment.find =
                    sinon.stub().callsArgWith(3, null, [1,2,3]);
                image.index(req, res);
                expect(sidebarStub).to.be.calledWith(
                    {image: testImage, comments: [1,2,3]}, sinon.match.func);
            });
            it('should render image template with image and comments', function(){
                ModelsStub.Comment.find =
                    sinon.stub().callsArgWith(3, null, [1,2,3]);
                sidebarStub.callsArgWith(1, {image: testImage, comments: [1,2,3]});
                image.index(req, res);
                expect(res.render).to.be.calledWith('image', {image: testImage, comments: [1,2,3]});
            });
        });
    });
});
