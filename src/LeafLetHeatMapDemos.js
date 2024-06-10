import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const LeafLetHeatMapDemos = () => {
  useEffect(() => {
    // Sample data for the heatmap (latitude, longitude, intensity)
    const heatmapData = [
      [51.5, -0.09, 1.0],
      [51.51, -0.1, 0.2],
      [51.49, -0.1, 0.8]
      // Add more data points as needed
    ];

    // Initialize the Leaflet map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add the tile layer (you might want to replace the URL with your own)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Convert the heatmap data to an appropriate format
    const heatData = heatmapData.map(point => [point[0], point[1], point[2]]);

    // Create the heatmap layer
    L.heatLayer(heatData).addTo(map);

    // Cleanup function
    return () => {
      map.remove(); // Remove the map when component unmounts
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default LeafLetHeatMapDemos;
