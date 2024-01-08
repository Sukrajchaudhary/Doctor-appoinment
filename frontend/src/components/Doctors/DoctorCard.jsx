/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
// import {  useNavigate } from "react-router-dom";

const DoctorCard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        setDoctors([]); // Clear existing data
        const response = await axios.get(`http://localhost:5000/api/v1/doctors`);
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
        setDoctors([]);
      }
    };
  
    fetchDoctorsData();
  }, []);
  
  // const navigate = useNavigate(); 

  return (
    <div>
      {doctors.map((doctor) => (
        <div key={doctor._id} className="p-3 lg:p-5">
          <div>
            <img src={doctor.photo} className="w-full" alt={doctor.name} />
          </div>

          <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
            {doctor.name}
          </h2>

          <div className="mt-2 lg:mt-4 flex items-center justify-between">
            <span
              className={`bg-${
                doctor.isApproved === "approved" ? "green" : "yellow"
              } text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded`}
            >
              {doctor.role === "doctor" ? "Doctor" : "Other Role"}
            </span>

            <div className="flex items-center gap-[6px]">
              <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                <img src={starIcon} alt="Star Icon" /> {doctor.averageRating}
              </span>
              <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                ({doctor.totalRating} Ratings)
              </span>
            </div>
          </div>

          <div className="mt-[18px] lg:mt-5">
            <p>Email: {doctor.email}</p>

            {doctor.role === "doctor" && (
              <p>Appointments: {doctor.appointments.length}</p>
            )}
          </div>

          <Link
        to={`/doctors/${doctor._id}`} // Navigate to the doctor details page with the doctor's ID
        className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primaryColor hover:border-none mt-4"
      >
        <BsArrowRight className="group-hover:text-white w-6 h-5" />
      </Link>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
