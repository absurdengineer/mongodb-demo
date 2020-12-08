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

const getDocuments = async (findCond={}, sortCond={}, selectCond={}) => {
    return await Course
        .find(findCond)
        .sort(sortCond)
        .select(selectCond)
    console.log(result)
}

const run = async () => {
    // Get name and author of all frontend and backend published courses sorted by their price in descending order, 
    const courses = await getDocuments({isPublished : true, tags : { $in : ['Frontend','Backend']} }, {price : -1},{name : 1, author : 1})
    console.log(courses)
}

run()