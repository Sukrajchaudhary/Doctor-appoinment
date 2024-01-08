// bookingController.js
import Booking from "../models/BookingSchema.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { doctor, user, ticketPrice, appointmentDate } = req.body;

  try {
    const newBooking = new Booking({
      doctor,
      user,
      ticketPrice,
      appointmentDate,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

// Update the status of a booking
export const updateBookingStatus = async (req, res) => {
  const { bookingId, newStatus } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};
