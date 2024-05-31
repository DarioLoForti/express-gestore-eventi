const fs = require('fs');
const path = require('path');

const reservationsPath = path.join(__dirname, '../data/reservations.json');

class Reservation {

    constructor(id, eventId, firstName, lastName, email ) {
        this.id = id;
        this.eventId = eventId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    setId(id) {
        if(typeof id !== 'number' || id <= 0) {
            throw new Error('Invalid id');
        }
        this.id = id;
    }
    
    setEventId(eventId) {
        if(typeof eventId !== 'number' || eventId <= 0) {
            throw new Error('Invalid event id');
        }
        this.eventId = eventId;
    }
    
    setFirstName(firstName) {
        if(typeof firstName !== 'string ' || firstName.length === 0) {
            throw new Error('Invalid first name');
        }
        this.firstName = firstName;
    }

    setLastName(lastName) {
        if(typeof lastName !== 'string ' || lastName.length === 0) {
            throw new Error('Invalid last name');
        }
        this.lastName = lastName;
    }

    setEmail(email) {
       const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
         if(!emailPattern.test(email)) {
              throw new Error('Invalid email');
         }

        this.email = email;
    }


    static getAll() {
        try {
            const data = fs.readFileSync(reservationsPath, 'utf8');
            return JSON.parse(data).map(reservation => new Reservation(reservation.id, reservation.eventId, reservation.firstName, reservation.lastName, reservation.email));
        } catch (error) {
            return [];
        }
    }

    static saveAll(reservations) {
        try {
            fs.writeFileSync(reservationsPath, JSON.stringify(reservations, null, 2));
        } catch (error) {
            throw new Error('Unable to save reservations');
        }
    }

    static create({ eventId, firstName, lastName, email }) {

        const reservations = Reservation.getAll();
        const id = reservations.length + 1;
        const newReservation = new Reservation(id, eventId, firstName, lastName, email);

        reservations.push(newReservation);
        Reservation.saveAll(reservations);

        return newReservation;

    }

    static delete(id) {
        const reservations = Reservation.getAll();
        const index = reservations.findIndex(reservation => reservation.id === parseInt(id));
        if (index === -1) {
            throw new Error('Reservation not found');
        }
        reservations.splice(index, 1);
        Reservation.saveAll(reservations);
    }

    static findByEventId(eventId) {
        const reservations = Reservation.getAll();
        return reservations.filter(reservation => reservation.eventId === parseInt(eventId));
    }
}

module.exports = Reservation;