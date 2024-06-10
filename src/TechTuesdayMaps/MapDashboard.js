import React from 'react';
import { Link } from "react-router-dom";

const MapDashboard = () => {
    return (
        <div>
            <h1>Introduction to Maps in React</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Link to={"/MapBoxDemo"}>Navigate To MapBoxDemo</Link>
                <Link to={"/ReactLeafletDemo"}>Navigate to ReactLeafletDemo</Link>
                <Link to={"/ReactGoogleDemo"}>Navigate to ReactGoogleDemo</Link>
            </div>
        </div>
    )
}

export default MapDashboard