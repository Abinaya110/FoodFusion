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
role:{
type:'string',
required: true,
enum:['customer','vendor'],
default:'customer',
},
createdAt:{
    type:'Date',
    default:"date.now",
}
});
const User = mongoose.model('User',userschema);
 module.exports = User;