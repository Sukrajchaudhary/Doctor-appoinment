import { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/doctors/6592d85647c50503267e3014/reviews");
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.data);
        } else {
          console.error("Error fetching feedback");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({feedbackData.length})
        </h4>

        {feedbackData.map((feedback) => (
          <div key={feedback._id} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={avatar} className="w-full" alt="" />
              </figure>

              <div>

                <p className="text-[14px] leading-6 text-textColor">
                  {formateDate(feedback.createdAt)}
                </p>
                <p className="text_para mt-3 font-medium text-[14px]">{feedback.reviewText}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(feedback.rating).keys()].map((index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
