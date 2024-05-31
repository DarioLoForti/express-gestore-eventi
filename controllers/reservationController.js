const Event = require('../models/event');
const Reservation = require('../models/reservation');
const { EventNotFoundError, ReservationNotAllowedError } = require('../models/errors');

const index = (req, res) => {
    try {
        const eventId = parseInt(req.params.event);
        const event = Event.findById(eventId);

        if (!event) {
            throw new EventNotFoundError('Event not found');
        }

        const reservations = event.getReservations();
        res.json(reservations);
    } catch (error) {
        if (error instanceof EventNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const store = (req, res) => {
    try {
        const eventId = parseInt(req.params.event);
        const { firstName, lastName, email } = req.body;

        const event = Event.findById(eventId);
        if (!event) {
            throw new EventNotFoundError('Event not found');
        }

        if (event.isEventInPast()) {
            throw new ReservationNotAllowedError('Cannot add reservation to past event');
        }

        if (event.isEventFull()) {
            throw new ReservationNotAllowedError('Event is already full');
        }

        const reservation = Reservation.create({
            firstName,
            lastName,
            email,
            eventId
        });

    
        res.status(201).json(reservation);
    } catch (error) {
        if (error instanceof EventNotFoundError || error instanceof ReservationNotAllowedError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const destroy = (req, res) => {
    try {
        const eventId = parseInt(req.params.event);
        const reservationId = parseInt(req.params.reservation);

        const event = Event.findById(eventId);
        if (!event) {
            throw new EventNotFoundError('Event not found');
        }

        if (event.isEventInPast()) {
            throw new ReservationNotAllowedError('Cannot remove reservation from past event');
        }

        event.removeReservation(reservationId);
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        if (error instanceof EventNotFoundError || error instanceof ReservationNotAllowedError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    index,
    store,
    destroy
};
