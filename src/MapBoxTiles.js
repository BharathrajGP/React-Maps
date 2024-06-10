import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Remember to replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
// mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhcmF0aHJhajAwNyIsImEiOiJjbHdobW42azYwaGUzMnNvY2Yzemh2Y2hsIn0.M6deEoetnck6VXM0vEwpIw';
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VkaGFyc2hhbjk5MDEiLCJhIjoiY2x3aGxodXp6MGk0dDJrcWYyM2d6ajVrZiJ9.G1Dtx9QojPSIYS6_GP1jMw';

const MapBoxTiles = () => {
    // const mapContainer = useRef(null);

    

    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //         style: 'mapbox://styles/mapbox/light-v11',
    //         zoom: 12,
    //         center: [-122.4473, 37.7535]
    //     });
    //     // Clean up the map instance when component unmounts
    //     map.on('load', () => {
    //         // Add the vector tileset as a source.
    //         map.addSource('ethnicity', {
    //             type: 'vector',
    //             url: 'mapbox://bharathraj007.cdr84sel'
    //         });
    //         map.addLayer(
    //             {
    //                 'id': 'population',
    //                 'type': 'circle',
    //                 'source': 'ethnicity',
    //                 'source-layer': 'New-d3yv56',
    //                 'paint': {
    //                     // Make circles larger as the user zooms from z12 to z22.
    //                     'circle-radius': {
    //                         'base': 1.75,
    //                         'stops': [
    //                             [12, 2],
    //                             [22, 180]
    //                         ]
    //                     },
    //                     // Color circles by ethnicity, using a `match` expression.
    //                     'circle-color': [
    //                         'match',
    //                         ['get', 'ethnicity'],
    //                         'White',
    //                         '#fbb03b',
    //                         'Black',
    //                         '#223b53',
    //                         'Hispanic',
    //                         '#e55e5e',
    //                         'Asian',
    //                         '#3bb2d0',
    //                         /* other */ '#ccc'
    //                     ]
    //                 }
    //             },
    //             // Place polygons under labels, roads and buildings.
    //             'aeroway-polygon'
    //         );
    //     });
    //     return () => map.remove();
    // }, []); // Only run this effect once on component mount

    // return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;

    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 3,
            minZoom:7,
            center: [14.5501, 47.5162]
        });
        // Clean up the map instance when component unmounts
        map.on('load', () => {
            // Add the vector tileset as a source.
            map.addSource('ethnicity', {    
                type: 'vector',
                url: 'mapbox://sudharshan9901.createGeojson-92orvo' // tile--mySql (mts)
            });
            map.addLayer(
                {
                    'id': 'population',
                    'type': 'circle',
                    'source': 'ethnicity',
                    'source-layer': 'original',
                    'paint': {
                        // Set a constant circle radius
                        'circle-radius': 10,
                        // Color circles by ethnicity, using a `match` expression.
                        "circle-color": [
                            "match",
                            ["get", "color"],
                            "red", "#FF0000",
                            "blue", "#0000FF",
                            "green", "#00FF00",
                            "yellow", "#008000",
                            "#000000" // Default color
                        ]
                    }

                },
                // Place polygons under labels, roads and buildings.
                'aeroway-polygon'
            );
        });
        return () => map.remove();
    }, []); // Only run this effect once on component mount

    return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default MapBoxTiles