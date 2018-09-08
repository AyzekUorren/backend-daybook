const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    required: [true, 'name field is required'],
  },
  password: {
    type: String,
    required: [true, 'password field is required'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password must have 9 characters, with one letter and one number'],
  },
  user_Events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events',
  }]
});
UsersSchema.set('validateBeforeSave', true);

const User = mongoose.model('user', UsersSchema);
module.exports = User;
