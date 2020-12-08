const mongoose = require('mongoose')
//* Database Connectivity
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(`Error : ${err.message}`))

//* Model Schema
const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date, default : Date.now },
    isPublished : Boolean
})

//* Model
const Course = mongoose.model('Course',courseSchema);

//* CRUD Methods
const createCourse = async (name, author, tags, isPublished) => {
    const course = new Course({
        name : name,
        author : author,
        tags : tags,
        isPublished : isPublished
    })
    //* To create a document in a collection
    const result = await course.save()
    console.log('User Created')
    console.log(result)
}
const getAllCourses = async () => {
    //* To Retrieve all documents of a collection
    const courses = await Course.find()
    console.log(courses)
}
const findCourses = async (findCond, sortCond={}, viewCond={}) => {
    pageNumber = 2
    pageSize = 1
    //* To Retrieve certain documents of a collection
    const courses = await Course
        .find(findCond)                     //? All documents satisfying findCond Property
        .skip((pageNumber -1) * pageSize)   //? skips the document from previous pages
        .limit(pageSize)                    //? limits the output documents
        .sort(sortCond)                     //? sorted in sortCond manner
        .select(viewCond)                   //? counts the documents satisfying findCond Property
    console.log(courses)
}
const updateCourse = async (id, newData) => {
    //* Update First Approach
    //* This Method By Default returns the old document 
    //* To get new one pass one more object 
    //* i.e., { new : true}
    const course = await Course.findByIdAndUpdate(id, {
        $set : newData
    },{ new : true})
    console.log(course)   
}
const removeCourse = async id => {
    //* deleteOne() will delete one document satisfying the provided condition
    //* And it returns the number of deleted documents and ok message.
    const result = await Course.deleteOne({ _id : id })
    console.log(result)
}

//?createCourse('React.JS', 'Mosh Hamedani', [ 'React', 'JS', 'Frontend' ], true)
//?getAllCourses()
//?findCourses({author : 'Mosh Hamedani'},{name : 1},{name:1, author :1})
//?findCourses({author : /^mosh/i},{name : 1},{name:1, author :1})
//?updateCourse('5fcf413ccee57b21189cdf38',{ name : "React.JS", author : "Mosh Hamedani" })
removeCourse('5fcf413ccee57b21189cdf38')