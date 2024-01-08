import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const Alert = ({ type, message, onClose }) => {
  const alertClasses = `rounded-md p-2 ${
    type === "success"
      ? "bg-green-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-red-500"
  } text-white absolute top-0 right-0 m-4`;

  return (
    <div className={alertClasses}>
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 focus:outline-none">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/bookings"
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });

    // Automatically close the alert after 3000 milliseconds (adjust as needed)
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/bookings/update-status",
        {
          bookingId,
          newStatus,
        }
      );

      // Update the local state with the updated booking
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      // Show a styled notification when the status is updated
      showAlert(
        newStatus === "approved"
          ? "success"
          : newStatus === "completed"
          ? "warning"
          : "error",
        `Booking status updated to: ${newStatus}`
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating booking status:", error.message);

      // Show an error notification
      showAlert("error", "Failed to update booking status");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/bookings/${bookingId}`
      );

      // Update the local state by filtering out the deleted booking
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );

      // Show a styled notification when the booking is deleted
      showAlert("error", "Booking deleted successfully");

      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting booking:", error.message);

      // Show an error notification
      showAlert("error", "Failed to delete booking");
    }
  };

  return (
    <div>
      <h1>Your Bookings</h1>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="flex flex-wrap">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg shadow-md p-4 m-4 max-w-md w-full"
          >
            {/* Display booking details as needed */}
            <p>User: {booking.user.name || "Saroj"}</p>
            <p>Ticket Price: {booking.ticketPrice}</p>
            <p>
              Appointment Date:{" "}
              {new Date(booking.appointmentDate).toLocaleDateString()}
            </p>
            <p>Status: {booking.status}</p>
            {/* Additional details can be displayed based on your Booking model */}

            {/* Status and Delete Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleStatusChange(booking._id, "approved")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faCheck} /> Approve
              </button>
              <button
                onClick={() => handleStatusChange(booking._id, "completed")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faCheck} /> Complete
              </button>
              <button
                onClick={() => handleDelete(booking._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
