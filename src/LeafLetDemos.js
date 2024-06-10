import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const LeafLetDemos = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('map').setView([0, 0], 2);

    // Add tile layer (you can use any tile provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create marker cluster group
    const markerCluster = L.markerClusterGroup();

    // Generate 20,000 random markers
    for (let i = 0; i < 10000; i++) {
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      const title = `Marker ${i}`;
      const description = `Description for Marker ${i}`;
      const markerInstance = L.marker([lat, lng]).bindPopup(`<b>${title}</b><br>${description}`);
      markerCluster.addLayer(markerInstance);
    }

    // Add marker cluster group to map
    map.addLayer(markerCluster);

    return () => {
      // Cleanup when component unmounts
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default LeafLetDemos;
