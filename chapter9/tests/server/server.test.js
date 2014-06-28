/* global describe, beforeEach, sinon, it, expect */
/* jshint node:true */
'use strict';

var proxyquire, expressStub, configStub, mongooseStub, app,
    server = function() {
        proxyquire('../../server', {
            'express': expressStub,
            './server/configure': configStub,
            'mongoose': mongooseStub
        });
    };

describe('Server', function() {
    beforeEach(function(){
        proxyquire = require('proxyquire'),
        app = {
            set: sinon.spy(),
            get: sinon.stub().returns(3300),
            listen: sinon.spy()
        },
        expressStub = sinon.stub().returns(app),
        configStub = sinon.stub().returns(app),
        mongooseStub = {
            connect: sinon.spy(),
            connection: {
                on: sinon.spy()
            }
        };

        delete process.env.PORT;
    });

    describe('Bootstrapping', function(){
        it('should create the app', function(){
            server();
            expect(expressStub).to.be.called;
        });
        it('should set the views', function(){
            server();
            expect(app.set.secondCall.args[0]).to.equal('views');
        });
        it('should configure the app', function(){
            server();
            expect(configStub).to.be.calledWith(app);
        });
        it('should connect with mongoose', function(){
            server();
            expect(mongooseStub.connect).to.be.calledWith(sinon.match.string);
        });
        it('should launch the app', function(){
            server();
            expect(app.get).to.be.calledWith('port');
            expect(app.listen).to.be.calledWith(3300, sinon.match.func);
        });
    });

    describe('Port', function(){
        it('should be set', function() {
            server();
            expect(app.set.firstCall.args[0]).to.equal('port');
        });
        it('should default to 3300', function() {
            server();
            expect(app.set.firstCall.args[1]).to.equal(3300);
        });
        it('should be configurable', function() {
            process.env.PORT = '5500';
            server();
            expect(app.set.firstCall.args[1]).to.equal('5500');
        });
    });
});

