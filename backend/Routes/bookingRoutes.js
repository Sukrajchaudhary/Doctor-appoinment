// routes.js
import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../Controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.route("/").post(createBooking);

// Get all bookings
router.route("/").get(getAllBookings);

// Update the status of a booking
router.route("/update-status").put(updateBookingStatus);

// Delete a booking
router.route("/:bookingId").delete(deleteBooking);

export default router;
