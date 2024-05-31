class EventNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EventNotFoundError';
    }
}

class ReservationNotAllowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ReservationNotAllowedError';
    }
}

module.exports = {
    EventNotFoundError,
    ReservationNotAllowedError
};
