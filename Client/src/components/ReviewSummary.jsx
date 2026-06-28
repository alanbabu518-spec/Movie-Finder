import { FaStar } from "react-icons/fa";
import "./ReviewSummary.css";

function ReviewSummary({
    reviews,
    averageRating,
    onWriteReview,
}) {

    const totalReviews = reviews.length;

    const getCount = (star) => {
        return reviews.filter(
            (review) => review.rating === star
        ).length;
    };

    const getWidth = (star) => {

        if (totalReviews === 0) return 0;

        return (
            (getCount(star) / totalReviews) * 100
        );

    };

    return (

        <div className="summary-card">

            <div className="summary-left">

                <h1>{averageRating}</h1>

                <p className="summary-total">

                    ({totalReviews} Reviews)

                </p>

            </div>

            <div className="summary-right">

                {[5, 4, 3, 2, 1].map((star) => (
                    <div
                        className="rating-row"
                        key={star}
                    >

                        <span className="rating-label">

                            {star} <FaStar style={{color:"yellow"}}/>

                        </span>

                        <div className="rating-bar">

                            <div
                                className="rating-fill"
                                style={{
                                    width: `${getWidth(star)}%`
                                }}
                            ></div>

                        </div>

                        <span className="rating-count">

                            {getCount(star)}

                        </span>

                    </div>
                ))}

            </div>

            <button
                className="write-review-btn"
                onClick={() => {
                    onWriteReview();
                }}
            >
                 Write Your Review
            </button>

        </div>

    );

}

export default ReviewSummary;