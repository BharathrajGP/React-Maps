import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polygon, InfoWindow } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const DrawingPolygonsWithDimensions = () => {
  const [polygonPaths, setPolygonPaths] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI',
    libraries: ['geometry']
  });

  useEffect(() => {
    if (polygonPaths.length > 1) {
      const newMarkers = [];
      const newDimensions = [];

      for (let i = 0; i < polygonPaths.length - 1; i++) {
        const startPoint = polygonPaths[i];
        const endPoint = polygonPaths[i + 1];

        // Calculate midpoint
        const midPoint = {
          lat: (startPoint.lat + endPoint.lat) / 2,
          lng: (startPoint.lng + endPoint.lng) / 2
        };
        newMarkers.push(midPoint);

        // Calculate distance between start and end points
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(startPoint.lat, startPoint.lng),
          new window.google.maps.LatLng(endPoint.lat, endPoint.lng)
        );
        newDimensions.push(distance.toFixed(2));
      }

      // Connect last and first points
      const startPoint = polygonPaths[polygonPaths.length - 1];
      const endPoint = polygonPaths[0];
      const midPoint = {
        lat: (startPoint.lat + endPoint.lat) / 2,
        lng: (startPoint.lng + endPoint.lng) / 2
      };
      newMarkers.push(midPoint);

      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(startPoint.lat, startPoint.lng),
        new window.google.maps.LatLng(endPoint.lat, endPoint.lng)
      );
      newDimensions.push(distance.toFixed(2));

      setMarkers(newMarkers);
      setDimensions(newDimensions);
    }
  }, [polygonPaths]);

  const handleMarkerClick = (markerIndex) => {
    setSelectedMarkerIndex(markerIndex);
  };

  const handleCloseInfoWindow = () => {
    setSelectedMarkerIndex(null);
  };

  if (loadError) return <div>Error loading Google Maps API</div>;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{ lat: 40.9403762, lng: -74.1318096 }}
          zoom={13}
          onClick={(event) => {
            const clickedLatLng = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            setPolygonPaths([...polygonPaths, clickedLatLng]);
          }}
        >
          {polygonPaths.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
            />
          ))}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => handleMarkerClick(index)}
              options={{
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 4,
                  fillColor: 'grey',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: 'black',
                }
              }}
            />
          ))}
          {selectedMarkerIndex !== null && (
            <InfoWindow
              position={{ lat: markers[selectedMarkerIndex].lat + 0.005, lng: markers[selectedMarkerIndex].lng }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>{dimensions[selectedMarkerIndex]} meters</div>
            </InfoWindow>
          )}
          {polygonPaths.length > 1 && (
            <Polygon
              paths={polygonPaths}
              options={{
                fillColor: "blue",
                fillOpacity: 0.4,
                strokeColor: "blue",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default DrawingPolygonsWithDimensions;