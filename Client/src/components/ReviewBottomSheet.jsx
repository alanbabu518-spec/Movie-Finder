import { useState } from "react";
import "./ReviewBottomSheet.css";
import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import RatingStars from "./RatingStars";
import { FaStar } from "react-icons/fa";

function ReviewBottomSheet({ reviews, averageRating, onClose, onWriteReview, onDelete, onEdit, onAddReview }) {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleWriteReview = () => {
        setShowForm(true);
        setTimeout(() => {
            document.getElementById("inline-review-form")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) { alert("Please select a rating"); return; }
        if (reviewText.trim() === "") { alert("Please write a review"); return; }

        const newReview = {
            id: Date.now(),
            username: localStorage.getItem("Username") || "Guest",
            rating,
            review: reviewText,
            createdAt: new Date().toLocaleDateString(),
        };

        onAddReview(newReview);
        setRating(0);
        setReviewText("");
        setShowForm(false);
    };

    return (
        <>
            <div className="review-overlay" onClick={onClose}></div>

            <div className="review-panel">
                <div className="drag-bar"></div>

                <div className="review-header">
                    <h2>User Reviews</h2>
                    <button className="close-review" onClick={onClose}>✕</button>
                </div>

                <ReviewSummary
                    reviews={reviews}
                    averageRating={averageRating}
                    onWriteReview={handleWriteReview}
                />

                {showForm && (
                    <div id="inline-review-form" className="inline-review-form">
                        <div className="inline-form-header">
                            <h3>Write Your Review</h3>
                            <button
                                className="inline-close-btn"
                                onClick={() => { setShowForm(false); setRating(0); setReviewText(""); }}
                            >✕</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <RatingStars rating={rating} setRating={setRating} />

                            <textarea
                                className="inline-textarea"
                                placeholder="Tell others what you think..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />

                            <button type="submit" className="inline-submit-btn">
                                Submit Review
                            </button>
                        </form>
                    </div>
                )}

                <div className="review-list">
                    {reviews.length === 0 ? (
                        <p className="empty-review">No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default ReviewBottomSheet;

