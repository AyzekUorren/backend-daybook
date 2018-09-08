const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcryptjs');
const Event = require('./event');

//Create DayBook user schema
const UsersSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email field is required'],
    unique: [true, 'email field is unique'],
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    'incorrect'],
    lowercase: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'password field is required'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password must have 9 characters, with one letter and one number'],
  }
});
UsersSchema.set('validateBeforeSave', true);

UsersSchema.pre('save', async function (next) {
  try {
    const salt =  await bycrypt.genSalt(10);
    const passwordHash = await bycrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

UsersSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bycrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user', UsersSchema);
module.exports = User;
