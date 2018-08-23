const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create DayBook schema
const EventsSchema = new Schema({
    startTime: {
      type: String
    },

    endTime: {
      type: String
    },

    allDay: {
      type: Boolean
    },

    type: {
      type: String
    },

    id: {
      type: Number
    }
});
const UsersSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Name field is required']
  },
  userPass: {
    type: String,
    required: [true, 'Password field is required']
  },
  user_Events: [EventsSchema]
});

const User = mongoose.model('user', UsersSchema);
const Events = mongoose.model('events', EventsSchema);

module.exports = { User, Events };
