import React, { useState, useEffect, useRef } from 'react';
import { getHotelById } from '../services/api';
import './about.css';

const About = () => {
    const [details, setDetails] = useState();
    const [showDetails, setShowDetails] = useState(false);

    const detailsOnClick = async (e) => {
        e.preventDefault();
        const hotelId = e.target[0].value;
        try {
            const res = await getHotelById(hotelId);

            console.log(res)
            setShowDetails(res);
            if (res.status == 200) {
                setShowDetails(res.data.data.body.searchResults[0].id);

            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const detailsByIdOnClick = async (id) => {
        try {
            const res = await getHotelById(id);
            console.log(res);
            // const res = JSON.parse(localStorage.getItem('list'))
            setDetails(res);
            if (res.status == 200) {
                setDetails(res.data.data.body.searchResults);

                // localStorage.setItem('list', JSON.stringify(res.data.data.body.searchResults))
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    // return <div>
    //     {showDetails && <div className="about-hotel-details">

    //         <div>
    //             {details?.map(s => (
    //                 <li key={s.hotelId} onClick={() => {
    //                     detailsByIdOnClick(s.hotelId);
    //                     setShowDetails(false);
    //                     setDetails()

    //                 }}></li>
    //             ))}
    //         </div>
    //     </div> 
    //     }
    //     </div>
                

              return  <div>About Page</div>


}

        export default About;