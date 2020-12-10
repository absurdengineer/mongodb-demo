const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(({name, message}) => console.error(`${name} : ${message}`))

const Author = mongoose.model('Author',new mongoose.Schema({
    name : String,
    bio : String,
    website : String
}))

const Course = mongoose.model('Course', new mongoose.Schema({
    name : String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    }
}))

const createAuthor = async (authorData) => {
    const author = new Author(authorData)
    const result = await author.save()
    console.log(result)
}
const createCourse = async (courseData) => {
    const course = new Course(courseData)
    const result = await course.save()
    console.log(result)
}
const listCourses = async () => {
    const courses = await Course
        .find()
        .populate('author','name -_id') 
        //* Above method will do the referencing work and will return the refernced document.
        //* In second argument we can specify which properties we want to include/exclude.
        .select('name author')
    console.log(courses);
}

//* createAuthor({name : 'Mosh Hamedani', bio : 'Mosh\'s Bio', website : 'codewithmosh.com'})
//* createCourse({name : 'Node.JS', author : "5fd1c6a0f5f764f4f01c7a3b"})
listCourses()