import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import RatingStars from "./RatingStars";
import "./ReviewForm.css";

function ReviewForm({ onAddReview, onClose }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (review.trim() === "") {
      alert("Please write a review");
      return;
    }

    const newReview = {
      id: Date.now(),
      username: localStorage.getItem("Username") || "Guest",
      rating,
      review,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddReview(newReview);

    setRating(0);
    setReview("");

    onClose();
  };

  return (
    <>
      <div className="form-overlay" onClick={onClose}></div>

      <div className="review-form-sheet">

        <div className="drag-handle"></div>

        <div className="form-header">
                <h2>Write Your Review</h2>

          <FaTimes
            className="close-icon"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit}>

          <RatingStars
            rating={rating}
            setRating={setRating}
          />

          <textarea
            placeholder="Write Your Review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button type="submit">
            Submit Review
          </button>

        </form>

      </div>
    </>
  );
}

export default ReviewForm;
