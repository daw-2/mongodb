let cities = ['Hulluch', 'Lens', 'Lille']

use my_db

db.students.find().forEach(function (student) {
    // printjson(student)
    db.students.update(
        { _id: student._id },
        { $set: { city: cities[Math.floor(Math.random() * cities.length)] } }
    )
})
