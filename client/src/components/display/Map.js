import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = (props) => {
    const { coords } = props;
    const API_KEY = `${process.env.REACT_APP_API_KEY}`;

    const LocationPin = () => (
        <div style={{
        height: "10vh",
        width: "10vh",
        background: "blue",
        color: "white",
        opacity: ".3",
        borderRadius: "100%"
        }}>
        </div>
    )
        
    const location = {
        address: "Some Text",
        lat: coords[1],
        lng: coords[0],
        }
    
    return(
        <div className="google-map" style={{width: "100%", height: "35vh"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
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
