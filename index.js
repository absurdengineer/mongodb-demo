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

const createCourse = async (name, author, tags, isPublished) => {
    const course = new Course({
        name : name,
        author : author,
        tags : tags,
        isPublished : isPublished
    })
    const result = await course.save()
    console.log(result)
}

createCourse('React.JS', 'Mosh Hamedani', [ 'React', 'JS', 'Frontend' ], true)