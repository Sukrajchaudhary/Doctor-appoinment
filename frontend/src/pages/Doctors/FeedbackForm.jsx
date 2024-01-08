import  { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/doctors/6592d85647c50503267e3014/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          reviewText,
        }),
      });

      if (response.ok) {
        // Reset the form fields
        setRating(0);
        setHover(0);
        setReviewText("");
        // Set reviewSubmitted to true to trigger the alert
        setReviewSubmitted(true);
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStarHover = (star) => {
    setHover(star);
  };

  const handleStarClick = (star) => {
    setRating(star);
    setHover(0); // Reset hover after selecting a star
  };

  // useEffect to reset reviewSubmitted after a certain duration
  useEffect(() => {
    let timeout;
    if (reviewSubmitted) {
      timeout = setTimeout(() => {
        setReviewSubmitted(false);
      }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [reviewSubmitted]);

  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[-16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?*
        </h3>

        <div>
          {[...Array(5).keys()].map((index) => {
            const star = index + 1;

            return (
              <button
                key={star}
                type="button"
                className={`${
                  star <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer `}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => handleStarHover(0)}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[-16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions*
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" onClick={handleSubmitReview} className="btn">
        Submit Feedback
      </button>

      {reviewSubmitted && (
        <div className="alert alert-success position-fixed top-0 end-0 mt-4 me-4">
          Review submitted successfully!
        </div>
      )}
    </form>
  );
};

export default FeedbackForm;
