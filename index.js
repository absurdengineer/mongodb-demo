const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(`Error : ${err.message}`))

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date, default : Date.now },
    isPublished : Boolean
})

const Course = mongoose.model('Course',courseSchema);
const course = new Course({
    name : "NodeJS",
    author : "Mosh Hamedani",
    tags : [ "NodeJS", "JS", "Backend" ],
    isPublished : true
})