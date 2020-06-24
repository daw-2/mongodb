use cinema

db.movies.insertMany([
    {
        title: 'Le Parrain', // required string
        released_at: 1972, // required int (1900 et 3000)
        category: 'Crime', // required enum
        overview: 'Lorem ipsum', // not required
        country: 'US', // required string
        director: { // required object
            name: 'Coppola', // required string
            firstname: 'Francis', // required string
            birthday: new Date('1939-04-07') // required date
        },
        actors: [ // array with minimum 1 actor
            { // object
                name: 'Pacino', // required string
                firstname: 'Al', // required string
                birthday: new Date('1940-04-25'), // required date
                role: 'Michael Corleone' // required string
            },
            {
                name: 'Brando',
                firstname: 'Marlon',
                birthday: new Date('1924-04-03'),
                role: 'Vito Corleone'
            }
        ]
    },
    {
        title: 'Heat',
        released_at: 1995,
        category: 'Crime',
        overview: 'Lorem ipsum',
        country: 'US',
        director: {
            name: 'Mann',
            firstname: 'Michael',
            birthday: new Date('1943-02-05')
        },
        actors: [
            {
                name: 'Pacino',
                firstname: 'Al',
                birthday: new Date('1940-04-25'),
                role: 'Vincent Hanna'
            },
            {
                name: 'De Niro',
                firstname: 'Robert',
                birthday: new Date('1943-08-17'),
                role: 'Neil McCauley'
            },
            {
                name: 'Kilmer',
                firstname: 'Val',
                birthday: new Date('1959-12-31'),
                role: 'Chris Shiherlis'
            }
        ]
    },
    {
        title: 'Le cinquième Elément',
        released_at: 1997,
        category: 'Science-Fiction',
        overview: 'Lorem ipsum',
        country: 'FR',
        director: {
            name: 'Besson',
            firstname: 'Luc',
            birthday: new Date('1959-03-18')
        },
        actors: [
            {
                name: 'Willis',
                firstname: 'Bruce',
                birthday: new Date('1955-03-19'),
                role: 'Korben Dallas'
            },
            {
                name: 'Jovovich',
                firstname: 'Milla',
                birthday: new Date('1924-04-03'),
                role: 'Leeloo'
            }
        ]
    },
]);

db.runCommand({
    collMod: 'movies',
    validator: { $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'released_at', 'category', 'country', 'director', 'actors'],
        properties: {
            title: { bsonType: 'string', description: 'Title must be a string' },
            released_at: { bsonType: 'int', minimum: 1900, maximum: 3000 },
            category: { enum: ['Crime', 'Science-Fiction'] },
            overview: { bsonType: 'string' },
            country: { bsonType: 'string' },
            director: {
                bsonType: 'object',
                required: ['name', 'firstname', 'birthday'],
                properties: {
                    name: { bsonType: 'string' },
                    firstname: { bsonType: 'string' },
                    birthday: { bsonType: 'date' }
                }
            },
            actors: {
                bsonType: 'array',
                minItems: 1,
                items: {
                    bsonType: 'object',
                    required: ['name', 'firstname', 'birthday', 'role'],
                    properties: {
                        name: { bsonType: 'string' },
                        firstname: { bsonType: 'string' },
                        birthday: { bsonType: 'date' },
                        role: { bsonType: 'string' }
                    }
                }
            }
        }
    } }
})
