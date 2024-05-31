const Event = require('../models/event');

    const index = (req, res) => {
        try{
            let events = Event.getAll();
            const {id, title, data} = req.query;

            if(id){
                events = events.filter(event => event.id === parseInt(id));
                if(events.length === 0){
                    return res.status(404).json({ error: 'Event not found' });
                }
                return res.json(events[0]);
            }

            if(title){
                events = events.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
            }

            if(data){
                events = events.filter(event => event.date === data);
            }

            res.json(events);
        } catch (error){
            res.status(500).json({ error: error.message });
        };  
    };

    const store = (req, res) => {
    try {
        const { title, description, date, maxSeats } = req.body;
        const newEvent = Event.create({ title, description, date, maxSeats });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = (req, res) => {
    try {
        const { title, description, date, maxSeats } = req.body;
        const updatedEvent = Event.update(req.params.event, { title, description, date, maxSeats });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    index,
    store,
    update
};