import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import planedImage from "./Plan.jpeg";
import customMarkerImage from './green_fill.png'; 

const initialMarkers = [
    { lat: 12.287306, lng: 76.594867 },
    { lat: 12.287327, lng: 76.594842 },
    { lat: 12.287309, lng: 76.594855 },
    { lat: 12.287289, lng: 76.594881 },
    { lat: 12.287263, lng: 76.594847 },
    { lat: 12.287361, lng: 76.594963 },
    { lat: 12.287233, lng: 76.594972 },
    { lat: 12.287287, lng: 76.594992 },
    { lat: 12.287393, lng: 76.594853 }
];

const boundMarkers = [
    { lat: 12.287408800998834, lng: 76.59482867926235 },
    { lat: 12.287422563389494, lng: 76.59499793313923 },
    { lat: 12.287146072450694, lng: 76.5950200613636 },
    { lat: 12.287135416018835, lng: 76.59484968354475 }
];

const initialCenter = [12.287410523328886, 76.59483180711094];

const CustomMarkers = ({ markers }) => {
    return markers.map((marker, index) => (
        <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={L.icon({
                iconUrl: customMarkerImage,
                iconSize: [12, 12],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            })}
        />
    ));
};

const FitBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        const leafletBounds = L.latLngBounds(bounds.map(b => [b.lat, b.lng]));
        map.fitBounds(leafletBounds);
    }, [bounds, map]);
    return null;
};

const IndoorLeafLetMapWithMarkerBoundWithCoordinates = () => {
    const [markers, setMarkers] = useState(initialMarkers);

    return (
        <MapContainer center={initialCenter} zoom={20} style={{ width: '100%', height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ImageOverlay
                url={planedImage}
                bounds={boundMarkers.map(b => [b.lat, b.lng])}
                opacity={0.75}
            />
            <CustomMarkers markers={markers} />
            <FitBounds bounds={boundMarkers} />
        </MapContainer>
    );
};

export default IndoorLeafLetMapWithMarkerBoundWithCoordinates;
