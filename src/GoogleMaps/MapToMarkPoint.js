import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const MapToMarkPoint = () => {
    const mapAPIKey='AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI'
    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [center, setCenter] = useState({ lat: 12.287410523328886, lng: 76.59483180711094 });
    const [placeName, setPlaceName] = useState('');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: mapAPIKey,
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const handleMapClick = (event) => {
        console.log({lat: event.latLng.lat(),
            lng: event.latLng.lng()});
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        setPlaceName('');
        setCenter({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    };

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        fetchPlaceName(marker);
    };

    const handleCloseInfoWindow = () => {
        setSelectedMarker(null);
        setPlaceName('');
    };

    const fetchPlaceName = async (marker) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${mapAPIKey}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const name = data.results[0].formatted_address;
                setPlaceName(name);
            } else {
                setPlaceName('Unknown');
            }
        } catch (error) {
            console.error('Error fetching place name:', error);
            setPlaceName('Unknown');
        }
    };

    useEffect(() => {
        if (map) {
            map.addListener('click', handleMapClick);
        }
    }, [map]);

    return isLoaded ? (
        <GoogleMap
            onLoad={(map) => setMap(map)}
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
        >
            {markerPosition && (
                <Marker
                    position={markerPosition}
                    onClick={() => handleMarkerClick(markerPosition)}
                />
            )}

            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker}
                    onCloseClick={handleCloseInfoWindow}
                >
                    <div>
                        <p>{placeName}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    ) : null;
};

export default MapToMarkPoint;
