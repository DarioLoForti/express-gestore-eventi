const fs = require('fs');
const path = require('path');
const Reservation = require('./reservation');

const eventsPath = path.join(__dirname, '../data/events.json');

class Event {

    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.setTitle(title);
        this.setDescription(description);
        this.setDate(date);
        this.setMaxSeats(maxSeats);
    }

    
    setTitle(title) {
        if (typeof title !== 'string' || title.length === 0) {
            throw new Error('Title must be a non-empty string');
        }
        this.title = title;
    }

    
    setDescription(description) {
        if (typeof description !== 'string') {
            throw new Error('Description must be a string');
        }
        this.description = description;
    }

    
    setDate(date) {
        if (!(date instanceof Date) || isNaN(date)) {
            throw new Error('Date must be a valid Date object');
        }
        this.date = date.toISOString(); 
    }

    
    setMaxSeats(maxSeats) {
        if (typeof maxSeats !== 'number' || maxSeats <= 0) {
            throw new Error('MaxSeats must be a positive number');
        }
        this.maxSeats = maxSeats;
    }

    static getAll() {
        try {
            const data = fs.readFileSync(eventsPath, 'utf8');
            return JSON.parse(data).map(event => new Event(event.id, event.title, event.description, new Date(event.date), event.maxSeats));
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
        const newEvent = new Event(id, title, description, new Date(date), maxSeats);

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
        events[index].setTitle = title || events[index].title;
        events[index].setDescription = description || events[index].description;
        events[index].setDate = date || events[index].date;
        events[index].setMaxSeats = maxSeats || events[index].maxSeats;
        Event.saveAll(events);
        return events[index];
    }

    static findById(id) {
        const events = Event.getAll();
        return events.find(event => event.id === id);
    }

    isEventInPast() {
        const eventDate = new Date(this.date);
        const currentDate = new Date();
        return eventDate < currentDate;
    }

    isEventFull() {
        const reservations = Reservation.findByEventId(this.id);
        return reservations.length >= this.maxSeats;
    
    }

    getReservations() {
        return Reservation.findByEventId(this.id);
    }
    addReservation(reservation) {
    }

    removeReservation(reservationId) {
        Reservation.delete(reservationId);
    }
}
    



module.exports = Event;