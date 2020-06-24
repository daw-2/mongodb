// L'année de sortie du film Le parrain.
db.movies.find({title: 'Le Parrain'}, { _id: 0, released_at: 1 })

// La liste des films sortis entre 80 et 90 avec un tri alphabétique.
db.movies.find({released_at: { $gte: 1970, $lt: 2000 }}).sort( { title: 1 } )

// La liste des films français.
db.movies.find({country: 'FR'})

// Tous les films du genre crimes.
db.movies.find({category: 'Crime'})

// Le nom, prénom et date de naissance de tous les réalisateurs de films français.
db.movies.aggregate({ $match: { country: 'FR' } }, { $replaceWith: '$director' })

// Le titre des films dont Bruce Willis est l'acteur.
db.movies.find({'actors.name': 'Willis', 'actors.firstname': 'Bruce'}, {_id: 0, title: 1})

// Le titre et le genre des films réalisés par Luc Besson.
db.movies.find({'director.name': 'Besson', 'director.firstname': 'Luc'}, {_id: 0, title: 1, category: 1})

db.movies.aggregate(
    { $project: {
        fullDirector: { $concat: ['$director.firstname', ' ', '$director.name'] },
        _id: 0,
        title: 1,
        category: 1
    } },
    { $match: { fullDirector: 'Luc Besson' } },
    { $project: { fullDirector: 0 } }
)

// Le nombre de films par pays par ordre décroissant.
db.movies.aggregate({$group: { _id: '$country', movies: { $sum: 1 } }})

// Le nom de l'acteur de Bruce Wayne dans Batman.
/*db.movies.find(
    {'actors.role': 'Michael Corleone'},
    {_id: 0, 'actors.$': 1}
)*/
db.movies.aggregate([
    {$unwind: '$actors'},
    {$project: {name: '$actors.name', firstname: '$actors.name', role: '$actors.role', _id: 0}},
    {$match : {role: 'Michael Corleone'}}
])

// Le nombre d'acteurs par films.
db.movies.aggregate({$unwind: '$actors'}, {$group: {_id: '$title', actors: { $sum: 1 }}})

// La moyenne d'acteurs par films.
db.movies.aggregate(
    {$unwind: '$actors'},
    {$group: {_id: '$title', actors: { $sum: 1 }}},
    {$group: {_id: null, average: { $avg: '$actors' }}},
)

// Collection box office
db.movies_box_office.insertMany([
    { movie: 'Le Parrain', entries: 100 },
    { movie: 'Heat', entries: 100 },
    { movie: 'Le cinquième Elément', entries: 100 }
])

// Nombre d'entrées du film Batman
db.movies.aggregate([
    { $lookup: {
        from: 'movies_box_office',
        localField: 'title',
        foreignField: 'movie',
        as: 'box_office'
    } },
    { $match: { title: 'Le Parrain' } },
    { $project: { _id: 0, title: 1, 'box_office.entries': 1 } }
])

// Nombre d'entrées pour chaque acteur
db.movies.aggregate([
    { $lookup: {
        from: 'movies_box_office',
        localField: 'title',
        foreignField: 'movie',
        as: 'box_office'
    } },
    { $out: 'movies_with_box_office' }
])

db.movies_with_box_office.mapReduce(
    function () {
        for (let actor of this.actors) {
            emit(actor.firstname + ' ' + actor.name, this.box_office[0].entries);
        }
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        out: { inline: 1 }
    }
)
