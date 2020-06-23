// Créer un rôle pour la lecture sur une collection
use my_db

db.createRole(
 {
   role: 'readStudentsCollection',
   privileges: [
     { resource: { db: 'my_db', collection: 'students' }, actions: [ 'find' ] }
   ],
   roles: []
 }
)

// Révoquer

db.revokeRolesFromUser('fiorella', ['readWrite'])

// Donner un rôle

db.grantRolesToUser('fiorella', ['readStudentsCollection'])
