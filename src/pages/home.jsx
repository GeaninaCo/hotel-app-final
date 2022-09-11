import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Pagination } from 'react-bootstrap';
import { searchByCity, getHotelsListByDestinationId } from '../services/api';
import Card from '../components/card/card';
import "./home.css"

//import Carusel from '../components/caruselComponent/caruselComponent';

const Home = () => {

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSellectedSuggestion] = useState();
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = useRef();
    const destinationId = useRef()

    useEffect(() => {
        if (suggestions.length > 0) setShowSuggestions(true);
    }, [suggestions.length])

    useEffect(() => {
       if(destinationId.current)handleSearchByDestination();
    }, [page])

    const handleSearch = async (e) => {
        e.preventDefault();
        const city = e.target[0].value;
        try {
            const data = await searchByCity(city);
            // const data = JSON.parse(localStorage.getItem('search'))
            // console.log(data)
            //setSuggestions(data)
            if (data.status == 200) {
                const sugg = [];
                data.data.suggestions.forEach(obj => sugg.push(...obj.entities))
                setSuggestions(sugg)
                //localStorage.setItem('search', JSON.stringify(sugg))
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSearchByDestination = async () => {
        try {
            const res = await getHotelsListByDestinationId(destinationId.current, page, pageSize);
            //const res = JSON.parse(localStorage.getItem('list'))
            //setList(res);
            if (res.status == 200) {
                totalPages.current = Math.ceil(res.data.data.body.searchResults.totalCount/pageSize);
                setList(res.data.data.body.searchResults);
                //localStorage.setItem('list', JSON.stringify(res.data.data.body.searchResults))
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChangePage = (pageNo) => {
        setPage(pageNo)
    }

    return (
        <div>
            <Form className="d-flex justify-content-center align-items-start gap-2 m-4" onSubmit={handleSearch}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <Form.Control 
                        type="search"
                        placeholder="Search for country, city, hotel..."
                        className="me-2"
                        aria-label="Search"
                        style=
                        {{backgroundColor: "white",
                         color: "black",
                         boxShadow: "inset 0 0 0 0 #f9e506",
                        
                         transition:"ease-out 0.5s",
                         fontSize:"1rem",
                         outline:"none",
                         border:" 10px coral outset",
                         
                         }}
                    />
                    {showSuggestions && <div className="home-suggestions-list">
                        {/* <h4>Please choose from one of the following suggestions:</h4> */}
                        <ul>
                            {suggestions?.map(s => (
                                <li key={s.destinationId} onClick={() => {
                                    destinationId.current = s.destinationId;
                                    handleSearchByDestination();
                                    setShowSuggestions(false);
                                    setSuggestions([])
                                    setSellectedSuggestion(s);
                                }}><div dangerouslySetInnerHTML={{ __html: s.caption }} /></li>
                            ))}
                        </ul>
                    </div>}
                </div>
                <button className="custom-form-button" type="submit">Search</button>
            </Form>
            <div className="home-hotels-list-container">
                {selectedSuggestion?.caption && <div dangerouslySetInnerHTML={{ __html: selectedSuggestion?.caption }} className="text-center" />}
                {list?.results?.length > 0 && <div>
                    {list?.results?.map(hotel => (
                        <Card
                            key={hotel.id}
                            hotelId={hotel.id}
                            imgUrl={hotel?.optimizedThumbUrls?.srpDesktop}
                            name={hotel.name}
                            address={hotel.address.countryName + ", " + hotel.address.region + ", " + hotel.address.locality + ", " + hotel.address.streetAddress}
                            rating={ hotel?.guestReviews?.rating || ''} 
                            badge={ hotel?.guestReviews?.badge || ''} 
                            landmarks={"Landmarks: "+ hotel.landmarks[0].label + ", " + hotel.landmarks[0].distance
                           +" &  " + hotel.landmarks[1].label + ", " + hotel.landmarks[1].distance }/>
                    ))}
                    <div>
                        <Pagination className="d-flex justify-content-center  "
                        style=
                        {{ 
                        
                         
                         }}>
                            <Pagination.First onClick={() => handleChangePage(1)} disabled={page === 1}/>
                            <Pagination.Prev onClick={() => setPage(prev => prev-1)} disabled={page === 1}/>
                            <Pagination.Item className="home-pagination-display">{`${page}/${totalPages.current}`}</Pagination.Item>
                            <Pagination.Next onClick={() => setPage(prev => prev+1)} disabled={page === totalPages.current}/>
                            <Pagination.Last onClick={() => handleChangePage(totalPages.current)} disabled={page === totalPages.current}/>
                        </Pagination>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default Home;