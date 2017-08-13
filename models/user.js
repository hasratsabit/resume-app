const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Check the E-mail length
let emailLengthChecker = function(email) {
	if(!email){
		return false;
	}else {
		if(email.lenth <  5 || email.length > 30){
			return false
		}else {
			return true;
		}
	}
}

// Validate Email
let validEmailChecker = function(email) {
	if(!email){
		return false;
	}else {
		const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return regExp.test(email);
	}
}

// Array of Email Validators
const emailValidators = [
	{
		validator: emailLengthChecker,
		message: 'Email must be longer than 5 and less than 30 characters'
	},
	{
		validator: validEmailChecker,
		message: 'It must be a valid E-mail address'
	}
]

// Check the Username length
let usernameLengthChecker = function(username) {
	if(!username){
		return false;
	}else {
		if(username.lenth <  5 || username.length > 30){
			return false
		}else {
			return true;
		}
	}
}

// Validate Username
let validUsernameChecker = function(username) {
	if(!username){
		return false;
	}else {
		// Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
		return regExp.test(username);
	}
}

// Array of Username Validators
const usernameValidators = [
	{
		validator: usernameLengthChecker,
		message: 'Username must be longer than 5 and less than 30 characters'
	},
	{
		validator: validUsernameChecker,
		message: 'It must be a valid E-mail address'
	}
]

// Check the Name length
let nameLengthChecker = function(name) {
	if(!name){
		return false;
	}else {
		if(name.lenth <  3 || name.length > 40){
			return false
		}else {
			return true;
		}
	}
}

// Validate Name
let validNameChecker = function(name) {
	if(!name){
		return false;
	}else {
		// Regular expression to test if name format is valid
    const regExp = new RegExp(/^[a-zA-Z ]+$/);
		return regExp.test(name);
	}
}

// Array of Name Validators
const nameValidators = [
	{
		validator: nameLengthChecker,
		message: 'Name must be longer than 3 and less than 30 characters'
	},
	{
		validator: validNameChecker,
		message: 'Names can be only letters'
	}
]

// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  // Second password validator
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];

const UserSchema = new Schema({
	name: { type: String, required: true, validate: nameValidators },
	email: { type: String, required: true, validate: emailValidators, unique: true, lowercase: true },
	username: { type: String, required: true, validate: usernameValidators, unique: true, lowercase: true },
	password: { type: String, required: true, lowercase: true, validate: passwordValidators },
	role: { type: String}

});

UserSchema.pre('save', (next) => {
	// This ensures that password is modified and passed the above validation before applying encryption.
	if(!this.isModified('password'))
		return next();
	// After passing the validation, this encrypts the password
	bcrypt.hash(this.password, null, null, (err, hash) => {
		if(err) return next(err);
		this.password = hash;
		return next();
	});
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
