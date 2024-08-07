"use client";

export const fetchCache = "force-no-store";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css";
import TogglerModeButton from "@/components/TogglerModeButton";

const fetchResults = async () => {
    const response = await axios.get("/api/get-distances");
    return response.data;
};

export default function SavedResults() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const [isOn, setIsOn] = useState(false);
    const [showDistanceLine, setShowDistanceLine] = useState(false);

    useEffect(() => {
        const getResults = async () => {
            try {
                const data = await fetchResults();
                setResults(data);
            } catch (err) {
                setIsError(true);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        getResults();
    }, []);

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
