import { FaStar } from "react-icons/fa";
import "./RatingStars.css";

function RatingStars({rating,setRating}){
    return(
        <div className="rating-stars">
            {[1,2,3,4,5].map((star)=>(
                <FaStar 
                   key={star}
                   className={star <= rating? "star active":"star"}
                   onClick={()=>setRating(star)}
                />
            ))}
        </div>
    );
}

export default RatingStars;
