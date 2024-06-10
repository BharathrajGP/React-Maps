import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyHeatmap = () => {
  // Simulated heatmap data (replace with your own aggregated data)
  const heatmapData = {
    z: [[1, 20, 30, 40], [50, 60, 70, 80], [90, 100, 110, 120]],
    type: 'heatmap',
  };

  return (
    <Plot
      data={[heatmapData]}
      layout={{
        width: 800,
        height: 600,
        title: 'Plotly Heatmap',
        xaxis: {
          title: 'X Axis Title',
        },
        yaxis: {
          title: 'Y Axis Title',
        },
      }}
    />
  );
};

export default PlotlyHeatmap;
