// import React, { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

// const MapBoxMapWithSearchBar = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null); // Map instance reference
//     // {
//     //     mapbox://styles/mapbox/navigation-night-v1
//     // mapbox://styles/mapbox/navigation-day-v1
//     // mapbox://styles/mapbox/satellite-streets-v12
//     // mapbox://styles/mapbox/satellite-v9
//     // mapbox://styles/mapbox/dark-v10
//     // mapbox://styles/mapbox/light-v10
//     // mapbox://styles/mapbox/outdoors-v11
//     // mapbox://styles/mapbox/streets-v11
//     // }

//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [76.59483180711094, 12.287410523328886],
//             zoom: 20,
//         });

//         // Save the map instance to the ref
//         mapRef.current = map;

//         // Add geocoder (search bar)
//         const geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             mapboxgl: mapboxgl,
//             marker: {
//                 color: 'orange',
//             },
//         });

//         map.addControl(geocoder);

//         geocoder.on('result', (e) => {
//             const coords = e.result.geometry.coordinates;
//             map.flyTo({
//                 center: coords,
//                 zoom: 20,
//             });
//         });

//         // Cleanup on unmount
//         return () => map.remove();
//     }, []);

//     return (
//         <div>
//             <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
//         </div>
//     );
// };

// export default MapBoxMapWithSearchBar;




import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const MapBoxMapWithSearchBar = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // Map instance reference
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

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: style,
            center: [76.59483180711094, 12.287410523328886],
            zoom: 20,
        });

        // Save the map instance to the ref
        mapRef.current = map;

        // Add geocoder (search bar)
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                color: 'orange',
            },
        });

        map.addControl(geocoder);

        geocoder.on('result', (e) => {
            const coords = e.result.geometry.coordinates;
            map.flyTo({
                center: coords,
                zoom: 20,
            });
        });

        // Cleanup on unmount
        return () => map.remove();
    }, [style]); // Re-run effect when the style changes

    const handleStyleChange = (event) => {
        setStyle(mapStyles[event.target.value]);
    };

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
            <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default MapBoxMapWithSearchBar;
