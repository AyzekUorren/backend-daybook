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
      required: true,
    }
});

const Events = mongoose.model('events', EventsSchema);
module.exports = Events;
