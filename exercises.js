const mongoose = require('mongoose')

//* Mongo DB Connection
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("Connected to MongoDB @ mongodb://127.0.0.1:27017/"))
    .catch(err => console.error(`Error : ${err.message}`))

//* Course Schema
const courseSchema = mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date, default : Date.now },
    price : Number,
    isPublished : Boolean
})

//* Modal
const Course = mongoose.model('Course', courseSchema)

const getDocuments = async (findCond={}, orCond, sortCond={}, selectCond={}) => {
    return await Course
        .find(findCond)
        .or(orCond)
        .sort(sortCond)
        .select(selectCond)
    console.log(result)
}

const run = async () => {
    //* Get all published courses that are $30 or more, or have the word 'JS' in their name.
    const courses = await getDocuments({isPublished : true }, [{price : { $gte : 30 }}, { name : /JS/i }])
    console.log(courses)
}

run()