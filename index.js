const mongoose = require('mongoose')
//* Database Connectivity
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error(`Error : ${err.message}`))

//* Model Schema
const courseSchema = new mongoose.Schema({
    name : {type : String, minlength : 3, maxlength : 255, required : true},
    author : {type : String, required : true},
    tags : {
        type : Array,
        validate : {
            //* Sometimes we validate the data after fetching some info from db which takes some time 
            //* so we use async validator there in following manner.
            isAsync : true,
            validator : (value,callback) => {
                setTimeout(() => {
                    result = value && value.length > 0
                    callback(result)
                },4000)
            },
            message : 'A Course Should have at least one tag.'
        }
    },
    date : { type : Date, default : Date.now },
    isPublished : {type : Boolean, required : true, default : false},
    category : {type : String, required : true, enum : ['web', 'mobile', 'network']},
    price : {type : Number, min :10, max : 200, required : function() { return this.isPublished }}
    //! Here we can't change function to arrow function because they don't have their this object.
})

//* Model
const Course = mongoose.model('Course',courseSchema);

//* CRUD Methods
const createCourse = async (name, author, tags, isPublished, price, category) => {
    try{
        const course = new Course({
            name : name,
            author : author,
            tags : tags,
            isPublished : isPublished,
            price : price,
            category : category
        })
        //* To create a document in a collection
        const result = await course.save()
        console.log('Course Created')
        console.log(result)
    } catch(error) {
        for (field in error.errors)
            console.log(error.errors[field].name, " : " , error.errors[field].message)
    }
}
const getAllCourses = async () => {
    try{
        //* To Retrieve all documents of a collection
        const courses = await Course.find()
        console.log(courses)
    } catch({message}) {
        console.error(`Error : ${message}`)
    }
}
const findCourses = async (findCond, sortCond={}, viewCond={}) => {
    pageNumber = 2
    pageSize = 1
    try {
        //* To Retrieve certain documents of a collection
        const courses = await Course
            .find(findCond)                     //? All documents satisfying findCond Property
            .skip((pageNumber -1) * pageSize)   //? skips the document from previous pages
            .limit(pageSize)                    //? limits the output documents
            .sort(sortCond)                     //? sorted in sortCond manner
            .select(viewCond)                   //? counts the documents satisfying findCond Property
        console.log(courses)
    } catch({message}) {
        console.error(`Error : ${message}`)
    }
}
const updateCourse = async (id, newData) => {
    try{
        //* Update First Approach
        //* This Method By Default returns the old document 
        //* To get new one pass one more object 
        //* i.e., { new : true}
        const course = await Course.findByIdAndUpdate(id, {
            $set : newData
        },{ new : true})
        console.log(course)   
    } catch({message}) {
        console.error(`Error : ${message}`)
    }
}
const removeCourse = async id => {
    try {
        //* findByIdAndRemove() will delete one document satisfying the provided condition
        //* And it returns the deleted document.
        const course = await Course.findByIdAndRemove(id)
        console.log(course)
    } catch({message}) {
        console.error(`Error : ${message}`)
    }
}

createCourse('React.JS', 'Mosh Hamedani', [], true, 50, '-')
//?getAllCourses()
//?findCourses({author : 'Mosh Hamedani'},{name : 1},{name:1, author :1})
//?findCourses({author : /^mosh/i},{name : 1},{name:1, author :1})
//?updateCourse('5fcf413ccee57b21189cdf38',{ name : "React.JS", author : "Mosh Hamedani" })
//?removeCourse('5fcf413ccee57b21189cdf38')