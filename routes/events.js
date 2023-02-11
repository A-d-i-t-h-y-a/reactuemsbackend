const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Events = require('../models/Events');
const router = express.Router()

// ROUTE 1: new event Data
router.post('/newevent',fetchuser, async (req, res)=>{
    try {
        const {name, description, etype, edate, etime, venue, food, quantity, mdescription, status} = req.body;
        const event = new Events({
            name, description, etype, edate, etime, venue, food, quantity, mdescription, status, user:req.user.id
        })
        const savedData = await event.save();
        res.json(savedData)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

// ROUTE 2: fetch events
router.post('/events', fetchuser, async (req, res)=>{
    try {
        const events = await Events.find({ user: req.user.id });
        res.json(events);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

// ROUTE 3: Update event Status
router.put('/update/:id', fetchuser, async(req, res)=>{
    try{
        const {status} = req.body;
        let event = await Events.findById(req.params.id);
        if (!event) { res.send(404).send("Not Found") }
        if (event.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        event = await Events.findByIdAndUpdate(req.params.id, {status : status})
        event = await Events.findOne({ _id : req.params.id })
        res.send(event);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

module.exports = router