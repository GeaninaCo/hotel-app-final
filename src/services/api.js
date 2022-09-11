import axios from 'axios'

const instance = axios.create ({
    baseURL : 'https://hotels4.p.rapidapi.com',
    headers: {
        'Accept': 'application/json',
        'X-RapidAPI-Key': '73923b4c84mshcb7fcbdd71ce725p173807jsn39b7e0a4847d',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
  })

async function searchByCity(city){
    try{
        const res = await instance.get(`/locations/v2/search?query=${city}`);
        return res;
    } 
    catch(error){
        throw new Error(error)
    }
}

async function getHotelsListByDestinationId(destinationId, page, pageSize) {
    try{
        const res = await instance.get(`/properties/list?destinationId=${destinationId}&pageNumber=${page}&pageSize=${pageSize}`);
        return res;
    } 
    catch(error){
        throw new Error(error)
    }
}

async function getHotelById(hotelId) {
    try{
        const res = await instance.get(`/properties/get-details?id=${hotelId}`);
        return res;
    } 
    catch(error){
        throw new Error(error)
    }
}

async function getHotelsImages(hotelId) {
    try{
        const res = await instance.get(`/properties/get-hotel-photos?id=${hotelId}`);
        return res;
    } 
    catch(error){
        throw new Error(error)
    }
}


export { searchByCity, getHotelsListByDestinationId, getHotelById, getHotelsImages }