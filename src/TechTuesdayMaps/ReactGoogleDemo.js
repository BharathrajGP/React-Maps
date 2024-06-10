// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Link } from "react-router-dom";

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const center = {
//   lat: 20.5937,
//   lng: 78.9629 // Center of India
// };

// const locations = [
//   { lat: 28.6139, lng: 77.209 }, // Delhi
//   { lat: 12.9716, lng: 77.5946 }, // Bangalore
//   { lat: 18.5204, lng: 73.8567 }, // Mumbai
//   { lat: 22.5726, lng: 88.3639 }, // Kolkata
//   { lat: 13.0827, lng: 80.2707 } // Chennai
// ];

// const ReactGoogleDemo = () => {
//   return (
//     <div>
//       <LoadScript googleMapsApiKey="AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={5} // Zoom level adjusted to view all markers
//         >
//           {locations.map((location, index) => (
//             <Marker key={index} position={location} />
//           ))}
//         </GoogleMap>
//       </LoadScript>

//        <div style={{display:"flex",justifyContent:"space-around"}}>
//           <Link to={"/MapBoxDemo"}>Navigate To MapBoxDemo</Link>
//           <Link to={"/ReactLeafletDemo"}>Navigate to ReactLeafletDemo</Link>
//         </div>
//     </div>
//   );
// }

// export default ReactGoogleDemo;

import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import green_fill from "./green_fill.png"

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

function ReactGoogleDemo() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI"
  })

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const icon = {
    path:
      "M 0,5 5,0 10,5 5,10 z",
    fillColor: "amber",
    fillOpacity: 1.0,
    strokeColor: "black",
    strokeWeight: 1,
    scale: 2
  };

  const markers = [
    { id: 1, lat: 28.6139, lng: 77.2090, title: 'New Delhi', content: 'This is New Delhi' },
    { id: 2, lat: 19.0760, lng: 72.8777, title: 'Mumbai', content: 'This is Mumbai' },
    { id: 3, lat: 12.9716, lng: 77.5946, title: 'Bengaluru', content: 'This is Bengaluru' },
    { id: 4, lat: 17.3850, lng: 78.4867, title: 'Hyderabad', content: 'This is Hyderabad' },
    { id: 5, lat: 22.5726, lng: 88.3639, title: 'Kolkata', content: 'This is Kolkata' },
    { id: 6, lat: 25.5941, lng: 85.1376, title: 'Patna', content: 'This is Patna' }
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
          onClick={() => handleMarkerClick(marker)}
          icon={green_fill}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>{selectedMarker.content}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default ReactGoogleDemo;


