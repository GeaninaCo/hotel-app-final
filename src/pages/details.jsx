import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById, getHotelsImages } from "../services/api";
import { AiOutlineWifi } from 'react-icons/ai';
import { IoTvSharp, IoBusinessSharp } from 'react-icons/io5';
import { SiPicnic } from 'react-icons/si';
import { GiCoffeeCup, GiDesk, GiVacuumCleaner } from 'react-icons/gi';
import { MdPool, MdOutlineFoodBank } from 'react-icons/md';
import { TbBus } from 'react-icons/tb';
import './details.css'

const Details = () => {
    const [data, setData] = useState();
    const [images, setImages] = useState();
    const { id, name } = useParams();
    console.log(id)

    useEffect(() => {
        async function getData() {
            try {
                //const dataStorage = JSON.parse(localStorage.getItem('details'))
                //setData(dataStorage)
                const res = await getHotelById(id);
                setData(res.data.data)
                //localStorage.setItem('details', JSON.stringify(res.data.data))

                const imgRes = await getHotelsImages(id);
                setImages(imgRes.data)
                //localStorage.setItem('images', JSON.stringify(imgRes.data))
                // const imagesStorage = JSON.parse(localStorage.getItem('images'))
                // setImages(imagesStorage)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [id])

    const formatImgUrl = (imgData) => {
        const size = imgData.sizes.find(size => size.type === 13);
        const imgSrc = imgData.baseUrl.replace('{size}', size.suffix);
        return imgSrc;
    }

    const getFacilityIcon = (facility) => {
        if (facility.toLowerCase().includes('wifi')) return <AiOutlineWifi className="me-1" />
        else if (facility.toLowerCase().includes('tv')) return <IoTvSharp className="me-1" />
        else if (facility.toLowerCase().includes('picnic')) return <SiPicnic className="me-1" />
        else if (/\b(coffee|terrace)\b/.test(facility.toLowerCase())) return <GiCoffeeCup className="me-1" />
        else if (facility.toLowerCase().includes('desk')) return <GiDesk className="me-1" />
        else if (facility.toLowerCase().includes('business')) return <IoBusinessSharp className="me-1" />
        else if (facility.toLowerCase().includes('pool')) return <MdPool className="me-1" />
        else if (facility.toLowerCase().includes('housekeeping')) return <GiVacuumCleaner className="me-1" />
        else if (facility.toLowerCase().includes('shuttle')) return <TbBus className="me-1" />
        else if (/\b(breakfast|lunch|dinner|restaurant)\b/.test(facility.toLowerCase())) return <MdOutlineFoodBank className="me-1" />
    }

    if (data) console.log(data.body, data?.body?.propertyDescription.mapWidget.staticMapUrl);

    return (
        <div style={{ color: "white" }} className="m-2">
            <div className="text-center">
                <h1>{name}</h1>
                <p>
                    {data?.body?.propertyDescription.address.cityName}
                    <span className="ms-1">
                        {data?.body?.propertyDescription.address.fullAddress}
                    </span>
                </p>
            </div>
            <div className="details-images-container">
                {images?.hotelImages?.filter((elem, index) => index < 3).map(hotelImg => (
                    <img key={hotelImg.imageId} src={formatImgUrl(hotelImg)} alt="hotel-details" />
                ))}
                {images?.roomImages[0].images?.filter((elem, index) => index < 3).map(hotelImg => (
                    <img key={hotelImg.imageId} src={formatImgUrl(hotelImg)} alt="hotel-details" />
                ))}
            </div>
            <div className="details-hotel-facilities">
                <h2 className="text-center mt-3">Most popular facilities</h2>
                <div className="d-flex flex-wrap gap-4 justify-content-center">
                    {data?.body?.overview?.overviewSections[0]?.content.map(elem => <div>{getFacilityIcon(elem)}{elem}</div>)}
                </div>
            </div>

            <div className="text-center">
                <div className="mt-4">
                    <h2>Pets friendly</h2>
                    <div>{data?.body?.atAGlance?.travellingOrInternet.travelling.pets.map(petInfo => <p>{petInfo}</p>)}</div>
                </div>
                <div className="mt-4">
                    <h2>Hotel Size</h2>
                    {data?.body?.atAGlance?.keyFacts?.hotelSize?.map(elem => (
                        <p>{elem}</p>
                    ))}
                </div>
                <div className="mt-4">
                    <h2>Arriving - Leaving</h2>
                    {data?.body?.atAGlance?.keyFacts?.arrivingLeaving?.map(elem => (
                        <p>{elem}</p>
                    ))}
                </div>
                <div className="mt-4">
                    <h2>Required at checkin</h2>
                    {data?.body?.atAGlance?.keyFacts?.requiredAtCheckIn?.map(elem => (
                        <p>{elem}</p>
                    ))}
                </div>
                <div className="mt-4">
                    <h2>Special CheckIn Instructions</h2>
                    {data?.body?.atAGlance?.keyFacts?.specialCheckInInstructions?.map(elem => (
                        <p>{elem}</p>
                    ))}
                </div>
                <div className="mt-4">
                    <h2>Transport and others</h2>
                    {data?.body?.atAGlance?.transportAndOther?.transport?.parking.map(elem => (
                        <p dangerouslySetInnerHTML={{ __html: elem }}></p>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Details;