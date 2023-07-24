const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

email:{
    type:'string',
    required: true,
    unique: true,
    trim: true,
},
password:{
    type:'string',
    required: true,
    minlength:10,
},
// createdAt: {
//     type: Date,
//     default: Date.now,
//   },
});
const User = mongoose.model('User',userschema);
 module.exports = User;