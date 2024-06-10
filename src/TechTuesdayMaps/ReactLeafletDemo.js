import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from "react-router-dom";

// Custom icon for red dot marker
const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [10, 10], // size of the icon
  iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -5] // point from which the popup should open relative to the iconAnchor
});

const locations = [
  { coordinates: [28.6139, 77.209], name: 'Delhi' },
  { coordinates: [12.9716, 77.5946], name: 'Bangalore' },
  { coordinates: [18.5204, 73.8567], name: 'Mumbai' },
  { coordinates: [22.5726, 88.3639], name: 'Kolkata' },
  { coordinates: [13.0827, 80.2707], name: 'Chennai' }
];

const ReactLeafletDemo = () => {
  return (
    <div>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates} icon={redIcon}>
            <Popup>
              <span>{location.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{display:"flex",justifyContent:"space-around"}}>
        <Link to={"/MapBoxDemo"}>Navigate To MapBoxDemo</Link>
        <Link to={"/ReactGoogleDemo"}>Navigate to ReactGoogleDemo</Link>
      </div>
    </div>
  );
};

export default ReactLeafletDemo;
