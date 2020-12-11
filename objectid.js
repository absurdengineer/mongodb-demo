const mongoose = require('mongoose')

//* _id = 5fd1e4925b6c95161ede4dec

//  * 12 bytes 
//  *       4 bytes : Timestamp
//  *       3 bytes : Machine Identifier
//  *       2 bytes : Process Identifier
//  *       3 bytes : Counter       

//* If we are on the same machine and same process executes 2 document at exact same Timestamp
//* then if the total no of documents generated at that time is 16M then only two id will have same value
//* 3 bytes = 2 ^ (8 * 3) = 16Millions

const oid = new mongoose.Types.ObjectId 
console.log(oid.getTimestamp())