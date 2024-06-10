import React, { useState } from 'react';
import { GoogleMap, OverlayView, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

import planedImage from "./Plan.jpeg";

const IndoorMapMarker = () => {
  // Coordinates for the image overlay
  const imageCoordinates = { lat: 12.2873590098108, lng: 76.59483197145643 };
  // 12.287359, 76.594902
  // Array of marker coordinates
  const initialMarkers = [
    { lat: 12.287306, lng: 76.594867 },
    { lat: 12.287327, lng: 76.594842 },
    { lat: 12.287309, lng: 76.594855 },
    { lat: 12.287289, lng: 76.594881 },
    { lat: 12.287263, lng: 76.594847 },
  ];

  const [markers, setMarkers] = useState(initialMarkers);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI', // Replace with your Google Maps API key
  });

  return isLoaded ? (
    <GoogleMap
      center={imageCoordinates}
      zoom={20}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      {/* OverlayView for the image */}
      <OverlayView
        position={imageCoordinates}
        mapPaneName={OverlayView.OVERLAY_LAYER}
      >
        <div>
          <div
            style={{
              position: 'absolute',
              background: 'white',
              border: '1px solid #ccc',
              padding: 5,
              borderRadius: 3,
            }}
          >
            <img
              src={planedImage}
              alt="Overlay Image"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
      </OverlayView>

      {/* Dynamically render markers */}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : null;
};

export default IndoorMapMarker;
