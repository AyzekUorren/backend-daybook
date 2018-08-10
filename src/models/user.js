const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create DayBook schema
const UsersSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Name field is required']
  },
  userPass: {
    type: String,
    required: [true, 'Password field is required']
  }
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;
