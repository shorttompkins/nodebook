var connect = require('connect'),
    path = require('path'),
    routes = require('./routes'),
    exphbs = require('express3-handlebars'),
    moment = require('moment'),
    fs = require('fs');

module.exports = function(app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(connect.logger('dev'));
    app.use(connect.bodyParser({
        uploadDir:path.join(__dirname, '../public/upload/temp')
    }));
    app.use(connect.json());
    app.use(connect.urlencoded());
    app.use(connect.methodOverride());
    app.use(connect.cookieParser('some-secret-value-here'));
    app.use(app.router);
    app.use('/public/', connect.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(connect.errorHandler());
    }

    routes.initialize(app);

    // ensure the temporary upload folder exists
    fs.exists(path.join(__dirname, '../public/upload/temp'), function(exist) {
        if (!exist) {
            fs.mkdir(path.join(__dirname, '../public/upload'), function(err){
                console.log(err);
                fs.mkdir(path.join(__dirname, '../public/upload/temp'), function(err){
                    console.log(err);
                });
            });
        }
    });

    return app;
};
