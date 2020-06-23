use cinema

db.movies.insertMany([
    {
        title: 'Le Parrain',
        released_at: 1972,
        category: 'Crime',
        overview: 'Lorem ipsum',
        country: 'US',
        director: {
            name: 'Coppola',
            firstname: 'Francis',
            birthday: new Date('1939-04-07')
        },
        actors: [
            {
                name: 'Pacino',
                firstname: 'Al',
                birthday: new Date('1940-04-25'),
                role: 'Michael Corleone'
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
