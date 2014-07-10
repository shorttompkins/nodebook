/* global describe, beforeEach, it, expect */
/* jshint node:true */
'use strict';

var CommentModel = require('../../models/comment'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

describe('Comment Model', function() {
    var comment;

    beforeEach(function(){
        comment = new CommentModel({
            image_id: new ObjectId(),
            email: 'test@test.com',
            name: 'Test Tester',
            gravatar: '123123123abcabcabc',
            comment: 'This is a test comment'
        });
    });

    it('should have a mongoose schema', function(){
        expect(CommentModel.schema).to.be.defined;
    });

    describe('Schema', function() {
        it('should have an image_id', function(){
            expect(comment.image_id).to.be.defined;
        });
        it('should have a email string', function(){
            expect(comment.email).to.be.defined;
        });
        it('should have a name string', function(){
            expect(comment.name).to.be.defined;
        });
        it('should have a gravatar string', function(){
            expect(comment.gravatar).to.be.defined;
        });
        it('should have a comment string', function(){
            expect(comment.comment).to.be.defined;
        });
        it('should have a timestamp date', function(){
            expect(comment.timestamp).to.be.defined;
        });
    });

    describe('Virtuals', function(){
        describe('image', function(){
            it('should be defined', function(){
                expect(comment.uniqueId).to.be.defined;
            });
            it('should set/get image object', function(){
                comment.image = { _id: 123 };
                expect(comment.image).to.eql({ _id: 123 });
            });
        });
    });
});
