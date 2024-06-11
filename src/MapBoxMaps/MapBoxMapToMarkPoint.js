import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const MapBoxMapToMarkPoint = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [style, setStyle] = useState('mapbox://styles/mapbox/streets-v11'); // Default style

    // List of available map styles
    const mapStyles = {
        Streets: 'mapbox://styles/mapbox/streets-v11',
        Outdoors: 'mapbox://styles/mapbox/outdoors-v11',
        Light: 'mapbox://styles/mapbox/light-v10',
        Dark: 'mapbox://styles/mapbox/dark-v10',
        Satellite: 'mapbox://styles/mapbox/satellite-v9',
        'Satellite Streets': 'mapbox://styles/mapbox/satellite-streets-v12',
        'Navigation Day': 'mapbox://styles/mapbox/navigation-day-v1',
        'Navigation Night': 'mapbox://styles/mapbox/navigation-night-v1',
    };

    const handleStyleChange = (event) => {
        setStyle(mapStyles[event.target.value]);
    };

    const initializeMap = () => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: style,
            center: [76.59483180711094, 12.287410523328886],
            zoom: 10,
        });

        map.current.on('load', () => {
            // Set map instance
        });

        map.current.on('click', (e) => {
            const coordinates = e.lngLat;
            // Log coordinates
            console.log('Clicked Coordinates:', coordinates);

            // Remove previous marker if exists
            if (marker.current) {
                marker.current.remove();
            }

            // Add marker
            marker.current = new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);

            // Reverse geocoding to get place name
            fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`
            )
                .then((response) => response.json())
                .then((data) => {
                    const placeName = data.features[0].place_name;
                    // Add popup with place name on marker click
                    marker.current.setPopup(new mapboxgl.Popup().setHTML(`<h3>${placeName}</h3>`));
                    marker.current.togglePopup();
                });
        });

        map.current.on('drag', () => {
            // Log new center coordinates when map is dragged
            console.log('New Center:', map.current.getCenter());
        });
    };

    useEffect(() => {
        if (!map.current) {
            initializeMap();
        }else {
            // Update map style if it's changed
            map.current.setStyle(style);
        }
    }, [style]);

    return (
        <div>
            <div>
                <select style={{width:"250px",height:"40px",borderRadius:"20px",textAlign:"center"}} onChange={handleStyleChange} value={Object.keys(mapStyles).find(key => mapStyles[key] === style)}>
                    {Object.keys(mapStyles).map((styleName) => (
                        <option key={styleName} value={styleName}>
                            {styleName}
                        </option>
                    ))}
                </select>
            </div>&nbsp;
            <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default MapBoxMapToMarkPoint;
