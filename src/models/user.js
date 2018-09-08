const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create DayBook user schema
const UsersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, 'Name field is required'],
    unique: [true, 'Name field is unique'],
  },
  Name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  },
  user_Events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events'
  }]
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;
