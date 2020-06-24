const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb://10.0.0.1:27017,10.0.0.2:27017/my_db',
    { useNewUrlParser: true, useUnifiedTopology: false }
);

mongoose.connection.once('open', () => {
    console.log('works');
}).on('error', error => console.log(error));

const ActorSchema = {
    name: String
};
const Actor = mongoose.model('Actor', ActorSchema);

const Movie = mongoose.model('Movie', {
    name: String,
    releasedAt: Date,
    actors: [ActorSchema]
});

// let movie = new Movie({ name: 'Le Parrain', releasedAt: new Date('1973-01-01') });
// movie.save();

app.get('/', (rq, rs) => {
    Movie.find({}, {}, { /*limit: 1, skip: 1*/ }).then(movies => {
        rs.render('index', { movies: movies });
    });
});

app.all('/movie/add', (rq, rs) => {
    if (Object.keys(rq.body).length > 0) {
        let actors = [];

        for (let actor of rq.body.actors) {
            if (actor.length > 0) {
                actors.push(new Actor({ name: actor }));
            }
        }

        let movie = new Movie({
            name: rq.body.name,
            releasedAt: new Date(rq.body.released_at),
            actors: actors
        });

        return movie.save().then(
            () => rs.redirect('/'),
            error => rs.send(error)
        );
    }

    rs.render('movie_add');
});

app.get('/movie/:id', (rq, rs) => {
    Movie.findOne({ _id: rq.params.id }).then(movie => {
        rs.render('movie_show', { movie: movie })
    }).catch(error => {
        rs.send(error);
    })
});

app.listen(80);
