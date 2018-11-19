const Booking = require('../models/booking');

function createBooking(req, res, next) {
  req.body.booker = req.tokenUserId;
  req.body.animal = req.params.animalId;
  console.log('animal', req.params.animalId);
  Booking.create(req.body)
    .then(booking => Booking.populate(booking, 'booker animal'))
    .then(booking => res.json(booking))
    .catch(next);
}

// show page! (booking confirmation)

function updateBooking(req, res, next) {
  Booking.findById(req.params.bookingId)
    .then(booking => booking.set(req.body))
    .then(booking => booking.save())
    .then(booking => res.json(booking))
    .catch(next);
}

function deleteBooking(req, res, next) {
  Booking.findByIdAndDelete(req.params.bookingId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: createBooking,
  update: updateBooking,
  delete: deleteBooking
};
