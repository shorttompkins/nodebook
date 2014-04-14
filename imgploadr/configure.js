var express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    exphbs = require('express3-handlebars');

module.exports = function(app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials']
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir:path.join(__dirname, 'public/upload/temp')}));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('some-secret-value-here'));
    app.use(app.router);
    app.use('/public/', express.static(path.join(__dirname, 'public')));

    if ('development' === app.get('env')) {
        app.use(express.errorHandler());
    }

    //routes list:
    routes.initialize(app);

    return app;
};
