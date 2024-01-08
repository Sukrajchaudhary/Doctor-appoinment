import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SidePanel = () => {
  const [isBookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [isBookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleBookNowClick = () => {
    setBookingDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setBookingDialogOpen(false);
    setBookingSuccess(false);
  };

  const createBooking = async () => {
    try {
      const bookingData = {
        doctor: "659b8fe65d3625a857a1338f",
        user: "6592e439e7ff327259831e70",
        ticketPrice: "500",
        appointmentDate: selectedDate.toISOString(),
      };

      const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBookingSuccess(true);

        // Automatically close the alert after 5 seconds (adjust the time as needed)
        setTimeout(() => {
          setBookingSuccess(false);
        }, 5000);
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setBookingDialogOpen(false);
    }
  };

  const renderBookingDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <p>Select Appointment Date:</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full mb-4 p-2 rounded-md border border-gray-300"
        />

        <button className="btn px-2 w-full rounded-md" onClick={createBooking}>
          Confirm Booking
        </button>
        <button className="btn px-2 w-full rounded-md" onClick={handleCloseDialog}>
          Cancel
        </button>
      </div>
    </div>
  );

  const renderBookingAlert = () => (
    <div className="fixed top-0 right-0 mt-5 mr-5 bg-green-500 text-white p-4 rounded-md">
      Booking created successfully!
      <button className="ml-2" onClick={handleCloseDialog}>
        Close
      </button>
    </div>
  );

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          500 NPR
        </span>
      </div>

      <div className="mt-[30px]">
        {/* Remove time slots */}
      </div>

      <button className="btn px-2 w-full rounded-md" onClick={handleBookNowClick}>
        Book Appointment
      </button>

      {isBookingDialogOpen && renderBookingDialog()}
      {isBookingSuccess && renderBookingAlert()}
    </div>
  );
};

export default SidePanel;
