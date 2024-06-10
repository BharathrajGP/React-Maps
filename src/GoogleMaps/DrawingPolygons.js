import React, { useState } from 'react';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const DrawingPolygons = () => {
  const [polygonPaths, setPolygonPaths] = useState([]);
  const [markers, setMarkers] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI',
    libraries: ['geometry']
  });

  const handleMapClick = (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkers([...markers, clickedLatLng]);

    // Update polygon paths
    setPolygonPaths([...polygonPaths, clickedLatLng]);
  };

  const handleSaveClick = () => {
    console.log('Polygon Vertices:', polygonPaths);
    console.log('Markers:', markers);
  };

  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{ lat: 12.2873590098108, lng: 76.59483197145643 }}
          zoom={13}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: 'transparent',
                fillOpacity: 0,
                strokeColor: 'black',
                strokeWeight: 2,
                scale: 5
              }}/>
          ))}
          {polygonPaths.length > 1 && (
            <Polygon
              paths={polygonPaths}
              options={{
                fillColor: "#FAFAFA",
                fillOpacity: 0.4,
                strokeColor: "black",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      )}
      <div>
        {/* <h2>Markers:</h2>
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>{`Lat: ${marker.lat}, Lng: ${marker.lng}`}</li>
          ))}
        </ul>
        <h2>Polygon Vertices:</h2>
        <ul>
          {polygonPaths.map((path, index) => (
            <li key={index}>{`Lat: ${path.lat}, Lng: ${path.lng}`}</li>
          ))}
        </ul> */}
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default DrawingPolygons;
