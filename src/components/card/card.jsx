import './card.css';
import {FcRating} from "react-icons/fc";
import {Link} from "react-router-dom";

<card />


const Card = ({imgUrl, name, address, rating, landmarks, badge, style, hotel, hotelId}) => {
    return(
        <div className="card-container m-2">
            <div>
                {imgUrl && <img src={imgUrl} alt="hotel-thumb"/>}
            </div>
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between"><h5>{name}</h5><h6>{rating}<FcRating className='ms-1 me-1'/>{badge}</h6></div>
                <p>{address}</p>
                <p>{landmarks}</p>
              <Link to={`/details/${hotelId}/${name}`}><span className="active">View details...</span></Link>
            </div>
        </div>
    )
}
export default Card;