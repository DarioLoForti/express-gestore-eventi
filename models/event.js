const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, '../data/events.json');

class Event {

    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static getAll() {

        const data = fs.readFileSync(eventsPath);
        return JSON.parse(data);

    }

    static saveAll(events) {

        fs.writeFileSync(eventsPath, JSON.stringify(events));

    }

    static create({ title, description, date, maxSeats }) {

        const events = Event.getAll();
        const id = events.length + 1;
        const newEvent = new Event(id, title, description, date, maxSeats);

        events.push(newEvent);
        Event.saveAll(events);

        return newEvent;

    }

    static update(id, { title, description, date, maxSeats }) {

        const events = Event.getAll();
        const event = events.find(event => event.id === id);

        if (!event) {
            throw new Error('Event not found');
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.maxSeats = maxSeats || event.maxSeats;

        Event.saveAll(events);

        return updatedEvent;

    }

    static findById(id) {

        const events = Event.getAll();
        return events.find(event => event.id === id);
        
    }
}



module.exports = Event;