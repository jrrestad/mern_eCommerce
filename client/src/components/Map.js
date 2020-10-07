import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'

const Map = (props) => {
    const { zipcode } = props;
   
    const [coords, setCoords] = useState('')

    const LocationPin = () => (
        <div style={{
        height: "5vh",
        width: "5vh",
        background: "blue",
        color: "white",
        opacity: ".3",
        borderRadius: "100%"
        }}>
        </div>
    )
    
    useEffect( () => {
        Geocode.setApiKey("AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw")
        Geocode.fromAddress(zipcode).then(
            response => {
                    console.log(response.results[0].geometry.location)
                    setCoords(response.results[0].geometry.location)
            },
            error => {
                setCoords({lng: 0, lat: 0})
                console.error(error);
            })
        }, [zipcode])
        
    const location = {
        address: "Some Text",
        lat: coords.lat,
        lng: coords.lng,
        }
    
    return(
        <div className="google-map" style={{width: "100%", height: "35vh"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD59vfWYpyItYDuIPp1mi3yAyYR1Vxcfjw' }}
        center={location}
        defaultZoom={12}
        >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
          />
      </GoogleMapReact>
    </div>
)
}

export default Map
