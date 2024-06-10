import React, { useState, useEffect } from 'react';
import { GoogleMap, OverlayView, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

import planedImage from "./Plan.jpeg";

const IndoorMapWithMarkerBoundWithCoordinates = () => {
    // Array of marker coordinates
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
    ]

    const initialCenter = { lat: 12.287410523328886, lng: 76.59483180711094 }

    const [markers, setMarkers] = useState(initialMarkers);
    const [googleMaps, setGoogleMaps] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI',
    });

    useEffect(() => {
        if (window.google) {
            setGoogleMaps(window.google.maps);
        }
    }, []);

    return isLoaded && googleMaps ? (
        <GoogleMap center={initialCenter} zoom={20} mapContainerStyle={{ width: '100%', height: '400px' }} >
            <OverlayView
                bounds={(boundMarkers.map(item => new googleMaps.LatLng(item.lat, item.lng))).reduce((bounds, coord) => bounds.extend(coord), new googleMaps.LatLngBounds())} mapPaneName={OverlayView.OVERLAY_LAYER} >
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
                        <img src={planedImage} alt="Overlay Image" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            </OverlayView>
            {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
            ))}
        </GoogleMap>
    ) : null;
};

export default IndoorMapWithMarkerBoundWithCoordinates;