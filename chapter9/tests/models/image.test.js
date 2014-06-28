/* global describe, beforeEach, it, expect */
/* jshint node:true */
'use strict';

var ImageModel = require('../../models/image');

describe('Image Model', function() {
    var image;

    beforeEach(function(){
        image = new ImageModel({
            title: 'Test',
            description: 'Testing',
            filename: 'testfile.jpg'
        });
    });

    it('should have a mongoose schema', function(){
        expect(ImageModel.schema).to.be.defined;
    });

    describe('Schema', function() {
        it('should have a title string', function(){
            expect(image.title).to.be.defined;
        });
        it('should have a description string', function(){
            expect(image.description).to.be.defined;
        });
        it('should have a filename string', function(){
            expect(image.filename).to.be.defined;
        });
        it('should have a views number default to 0', function(){
            expect(image.views).to.be.defined;
            expect(image.views).to.equal(0);
        });
        it('should have a likes number default to 0', function(){
            expect(image.likes).to.be.defined;
            expect(image.likes).to.equal(0);
        });
        it('should have a timestamp date', function(){
            expect(image.timestamp).to.be.defined;
        });
    });

    describe('Virtuals', function(){
        describe('uniqueId', function(){
            it('should be defined', function(){
                expect(image.uniqueId).to.be.defined;
            });
            it('should get filename without extension', function(){
                expect(image.uniqueId).to.equal('testfile');
            });
        });
    });
});
