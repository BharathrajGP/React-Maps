import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';


const MapsWithSearchBar = () => {

    const initialCenter = { lat: 12.287410523328886, lng: 76.59483180711094 }

    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI',
        libraries: ['places'],
    });

    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            if (mapRef.current) {
                mapRef.current.panTo({ lat: lat(), lng: lng() });
                mapRef.current.setZoom(20);
            }
        }
    };

    return isLoaded ? (
        <div>
            <GoogleMap
                center={initialCenter}
                zoom={20}
                mapContainerStyle={{ width: '100%', height: '400px' }}
                onLoad={map => (mapRef.current = map)}  // Set the map instance to the ref
            >
                <Autocomplete
                    onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Search a place"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `40px`,
                            padding: `0 12px`,
                            borderRadius: `20px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px",
                            marginTop: "10px"
                        }}
                    />
                </Autocomplete>
            </GoogleMap>
        </div>
    ) : null;
};

export default MapsWithSearchBar;
