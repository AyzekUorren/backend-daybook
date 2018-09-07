const express = require ('express');
const router = express.Router();
const mongoReq = require('../requests/mongoReq')

router
.post('/user/log', mongoReq.log)
.post('/user/registration', mongoReq.registaration)
.post('/events', mongoReq.events)


module.exports = router;
