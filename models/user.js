const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bctypt = require ('bcrypt-nodejs');

let emailLenghtChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length > 30) {
            return false;
        }else{
            return true;
        }
    }
};
let validEmailChecker = (email) => {
if (!email){
    return false;
}else{
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return true/false
}
};
const emailValidators = [
    {
        validator: emailLenghtChecker, 
        message:'email should be at least 5 characters but no more than 30'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];
// Validate Function to check username length
let usernameLengthChecker = (username) => {
 if(!username){
     return false;
 }else{
   if(username.length <3 || username.length > 15) {
       return false;
   }else{
       return true;
   }
 }
};

// if valid username format
let validUsername = (username) => {
if (!username) {
    return false; 
  } else {
       const regExp = new RegExp(/^[a-zA-Z0-9]+$/);  // if username format is valid
    return regExp.test(username); // true/false
  }
};

const usernameValidators = [
   {
       validator: usernameLengthChecker,
       message: 'Username should be no less 3 and no more 15 characters'
   },
   {
       validator: validUsername,
       message: 'Username must not have any special characters'
   }
];

//Password validation
let passwordLengthChecker = (password) => {
 if(!password){
     return false;
 }else{
     if(password.length <8 || password.length>35){
         return false;
     }else{
         return true;
     }
 }
};
let validPassword =(password) =>{
if(!password){
    return false;
}else{
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
}
};

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password shoul be in interval from 8 to 35 characters'
    },
    {
        validator: validPassword,
        message:'Must have at least one uppercase, lowercase, special character, and number'
    }
];
const userSchema = new Schema({
email:{type: String, required: true, unique: true, lowercase: true, validate:emailValidators},
username:{type: String, required: true, unique: true, lowercase: true, validate:usernameValidators},  
password:{type: String, required: true, validate:passwordValidators}
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();
    //inscrypt the password
    bctypt.hash(this.password, null, null, (err, hash) =>{
        if(err) return next(err);
        this.password = hash;
        next();
    });

});
//decrypted password and compare them, return true/false
userSchema.methods.comparePassword = (password) =>{
    return bctypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);