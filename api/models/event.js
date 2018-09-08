const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
});

const Event = mongoose.model('event', EventsSchema);
module.exports = Event;
