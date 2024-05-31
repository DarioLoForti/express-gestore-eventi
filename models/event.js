const fs = require('fs');
const path = require('path');
const Reservation = require('./reservation');

const eventsPath = path.join(__dirname, '../data/events.json');
const reservationsPath = path.join(__dirname, '../data/reservations.json');
class Event {

    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    setId(id) {
        if (typeof id !== 'number' || id <= 0) {
            throw new Error('Invalid id');
        }
        this.id = id;
    }

    setTitle(title) {
        if (typeof title !== 'string' || title.length === 0) {
            throw new Error('Invalid title');
        }
        this.title = title;
    }

    setDescription(description) {
        if (typeof description !== 'string' || description.length === 0) {
            throw new Error('Invalid description');
        }
        this.description = description;
    }

    setDate(date) {
        if (typeof date !== 'string' || date.length === 0) {
            throw new Error('Invalid date');
        }   
        this.date = date;
    }

    setMaxSeats(maxSeats) {
        if (typeof maxSeats !== 'number' || maxSeats <= 0) {
            throw new Error('Invalid maxSeats');
        }
        this.maxSeats = maxSeats;
    }

    static getAll() {
        try {
            const data = fs.readFileSync(eventsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
        
            return [];
        }
    }

    static saveAll(events) {
        try {
            fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
        } catch (error) {
            throw new Error('Unable to save events');
        }
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
        const index = events.findIndex(event => event.id === parseInt(id));
        if (index === -1) {
            throw new Error('Event not found');
        }
        events[index].title = title || events[index].title;
        events[index].description = description || events[index].description;
        events[index].date = date || events[index].date;
        events[index].maxSeats = maxSeats || events[index].maxSeats;
        Event.saveAll(events);
        return events[index];
    }

    static findById(id) {
        const events = Event.getAll();
        return events.find(event => event.id === id);
    }


    getReservations() {
    const reservations = Reservation.findByEventId(this.id);
    return reservations;
    }
}
    



module.exports = Event;