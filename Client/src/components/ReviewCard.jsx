import "./ReviewCard.css";
import { FaStar, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function ReviewCard({ review, onDelete, onEdit }) {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div className="review-card">

            <div className="review-top">

                <div className="review-user">

                    <div className="review-avatar">
                        {review.username?.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h3>{review.username}</h3>

                        <div className="review-stars">

                            {stars.map((star) => (
                                <FaStar
                                    key={star}
                                    className={
                                        star <= review.rating
                                            ? "star active"
                                            : "star"
                                    }
                                />
                            ))}

                        </div>

                    </div>

                </div>

                <div className="review-actions">

                    <button
                        className="edit-btn"
                        onClick={() => onEdit(review)}
                    >
                        <FaEdit />
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(review.id)}
                    >
                        <MdDeleteForever />
                    </button>

                </div>

            </div>

            <p className="review-text">
                {review.review}
            </p>

            <span className="review-date">
                {review.createdAt}
            </span>

        </div>
    );
}

export default ReviewCard;
