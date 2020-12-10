const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(({name, message}) => console.error(`${name} : ${message}`))

//? Schemas
const authorSchema = new mongoose.Schema({
    name : String,
    bio : String,
    website : String
})
const courseSchema = new mongoose.Schema({
    name : String,
    authors : {
        type : [authorSchema],
        required : true
    }
})

//? Models
const Author = mongoose.model('Author', authorSchema)
const Course = mongoose.model('Course', courseSchema)

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
        .select('name author')
    console.log(courses);
}
const updateAuthor = async (courseId) => {
    const course = await Course.update({_id :courseId},{
        $unset : {
            'author' : ''
        }
    })
}
const addAuthor = async (courseId, author) => {
    course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}

//* createAuthor({name : 'Mosh Hamedani', bio : 'Mosh\'s Bio', website : 'codewithmosh.com'})
//* createCourse({name : 'Node.JS', authors : [
//*     new Author({name : 'Mosh Hamedani', bio : 'Mosh\'s Bio', website : 'codewithmosh.com'}),
//*     new Author({name : 'John Doe', bio : 'John\'s Bio', website : 'johndoeprogrammer.com'})
//*     ]
//* })
//* listCourses()
//* updateAuthor('5fd1dff245c4800fe9ba5521')
addAuthor('5fd1e4925b6c95161ede4dec',new Author({name : 'Rafeh Qazi', bio : 'Qazi\'s Bio', website : 'cleverprogrammer.com'}))
