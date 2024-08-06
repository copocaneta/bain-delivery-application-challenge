"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import "./page.css";
import TogglerModeButton from "@/components/TogglerModeButton";

const fetchResults = async () => {
    const response = await axios.get("/api/get-distances");
    return response.data;
};

export default function SavedResults() {
    const {
        data: results,
        isLoading,
        isError,
        error,
    } = useQuery("savedResults", fetchResults);

    const [isOn, setIsOn] = useState(false);
    const [showDistanceLine, setShowDistanceLine] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        setShowDistanceLine(!isOn);
    };

    return (
        <div className="saved-container">
            <h1>Saved Results</h1>
            <div className="toggle-mode-button">
                <TogglerModeButton isOn={isOn} toggleSwitch={toggleSwitch} />
            </div>
            {isLoading && <div className="loader">Loading...</div>}
            {isError && <div className="error">{error.message}</div>}
            {!isLoading && !isError && (
                <div className="results-list">
                    {results.map((result, index) => (
                        <div key={index} className="result-item">
                            <p>Source: {result.source}</p>
                            <p>Destination: {result.destination}</p>
                            <p>
                                {/* {showDistanceLine ? ( */}
                                Distance:{" "}
                                {showDistanceLine
                                    ? result.distance_line.toFixed(2)
                                    : result.distance_roads.toFixed(2)}{" "}
                                km
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
