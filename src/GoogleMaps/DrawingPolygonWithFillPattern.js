import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const DrawingPolygonWithFillPattern = () => {
    const [polygonPaths, setPolygonPaths] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [xMarkMarkers, setXMarkMarkers] = useState([]);

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

    useEffect(() => {
        if (polygonPaths.length < 3) return;

        // Calculate the bounding box of the polygon
        const bounds = new window.google.maps.LatLngBounds();
        polygonPaths.forEach(point => bounds.extend(point));
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        // Generate 'X' mark markers to fill the polygon area
        const xMarks = [];
        const numX = 20;
        const stepX = (ne.lng() - sw.lng()) / numX;
        const stepY = (ne.lat() - sw.lat()) / numX;
        for (let i = 0; i < numX; i++) {
            for (let j = 0; j < numX; j++) {
                const xMark = {
                    lat: sw.lat() + stepY * i,
                    lng: sw.lng() + stepX * j
                };
                if (window.google.maps.geometry.poly.containsLocation(xMark, new window.google.maps.Polygon({ paths: polygonPaths }))) {
                    xMarks.push(xMark);
                }
            }
        }
        setXMarkMarkers(xMarks);
    }, [polygonPaths]);

    const handleSaveClick = () => {
        console.log('Polygon Vertices:', polygonPaths);
        console.log('Markers:', markers);
    };

    if (loadError) return <div>Error loading Google Maps API</div>;

    const svg = `<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="8" y2="8" stroke="black" stroke-width="1"/><line x1="0" y1="8" x2="8" y2="0" stroke="black" stroke-width="1"/></svg>`;
    const url = `data:image/svg+xml;base64,${btoa(svg)}`;

    return (
        <div style={{ height: '400px', width: '100%' }}>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={{ lat: 40.9403762, lng: -74.1318096 }}
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
                        }} />
                    ))}
                    {polygonPaths.length > 1 && (
                        <>
                            <Polygon
                                paths={polygonPaths}
                                options={{
                                    fillOpacity: 0.4,
                                    strokeColor: "black",
                                    strokeOpacity: 1,
                                    strokeWeight: 2,
                                }}
                            />
                            {xMarkMarkers.map((xMark, index) => (
                                <Marker key={index} position={xMark} icon={{
                                    url: url,
                                    // scaledSize: new window.google.maps.Size(8, 8),
                                    // anchor: new window.google.maps.Point(4, 4),
                                }} />
                            ))}
                        </>
                    )}
                </GoogleMap>
            )}
            <div>
                <button onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default DrawingPolygonWithFillPattern;
