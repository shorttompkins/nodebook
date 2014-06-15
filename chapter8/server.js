var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    json = require('./movies.json'),
    app = express(),
    request = require('request');

app.set('port', process.env.PORT || 3500);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var router = new express.Router();

router.get('/test', function(req, res) {
    var data = {
        name: 'Jason Krol',
        website: 'http://kroltech.com'
    };

    res.json(data);
});

router.get('/', function(req, res) {
    res.json(json);
});

router.post('/', function(req, res) {
    // insert the new item into the collection
    if(req.body.Id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating) {
        json.push(req.body);
        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});

router.put('/:id', function(req, res) {
    // update the item in the collection
    if(req.params.id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating) {
        _.each(json, function(elem, index) {
            // find and update:
            if (elem.Id === req.params.id) {
                elem.Title = req.body.Title;
                elem.Director = req.body.Director;
                elem.Year = req.body.Year;
                elem.Rating = req.body.Rating;
            }
        });

        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});

router.delete('/:id', function(req, res) {
    var indexToDel = -1;
    _.each(json, function(elem, index) {
        if (elem.Id === req.params.id) {
            indexToDel = index;
        }
    });
    if (~indexToDel) {
        json.splice(indexToDel, 1);
    }
    res.json(json);
});

router.get('/external-api', function(req, res) {
    request({
            method: 'GET',
            uri: 'http://localhost:' + (process.env.PORT || 3500),
        }, function(error, response, body) {
            if (error) { throw error; }

            var movies = [];
            _.each(JSON.parse(body), function(elem, index) {
                movies.push({
                    Title: elem.Title,
                    Rating: elem.Rating
                });
            });
            res.json(_.sortBy(movies, 'Rating').reverse());
        });
});

router.get('/imdb', function(req, res) {
    request({
            method: 'GET',
            uri: 'http://sg.media-imdb.com/suggests/a/aliens.json',
        }, function(err, response, body) {
            var data = body.substring(body.indexOf('(')+1);
            data = JSON.parse(data.substring(0,data.length-1));
            var related = [];
            _.each(data.d, function(movie, index) {
                related.push({
                    Title: movie.l,
                    Year: movie.y,
                    Poster: movie.i ? movie.i[0] : ''
                });
            });

            res.json(related);
        });
});

app.use('/', router);

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
