import React, { useEffect, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CampaignIds200 from './CampaignIds';
import axios from 'axios';
import Pako from 'pako';

const containerStyle = {
    width: '100%',
    height: '450px'
};

const GoogleMapButtonDemo = () => {
    const [markerData, setMarkerData] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAVgnsW10y8vWoH5kyKdehOuoQ9x9dA5kI"
    });

    const handleSubmit = async () => {
        try {
            const mapValuesResponse = await axios.post('http://localhost:3001/getMapData', {
                filterKey: 'lteRSRP',
                CampaignIds: CampaignIds200
            });

            if (mapValuesResponse && mapValuesResponse.data) {
                const compressedData = mapValuesResponse.data;
                const decompressedData = Pako.inflate(compressedData, { to: "string" });
                const mapValues = JSON.parse(decompressedData);
                setMarkerData(mapValues);
            }
        } catch (error) {
            console.error("Error fetching or decoding map data:", error);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
        setMapLoaded(true);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
        setMapLoaded(false);
    }, []);

    const handleActiveMarker = (marker) => {
        setActiveMarker(marker);
    };

    return isLoaded && (
        <div style={{ height: '100%', width: "100%" }}>
            {mapLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {markerData && markerData.map(({ id, position }) => (
                        <Marker
                            key={id}
                            position={position}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id && (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    {/* InfoWindow content goes here */}
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                    <></>
                </GoogleMap>
            )}
        </div>
    );
};

export default GoogleMapButtonDemo;
