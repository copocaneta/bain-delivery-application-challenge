"use client";

import React, { useState } from "react";
import axios from "axios";
import "./page.css";
import TogglerModeButton from "@/components/TogglerModeButton";

const fetchCoordinates = async (address) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(
                address
            )}&format=jsonv2&limit=1`
        );
        return response.data[0];
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

/**
 * 
 * 
 * Fetchroad distance response format for reference:
 {
    "code": "Ok",
    "routes": [
        {
            "legs": [
                {
                    "steps": [],
                    "summary": "",
                    "weight": 18612,
                    "duration": 18612,
                    "distance": 442048.8
 */

const fetchRoadDistance = async (location1, location2) => {
    try {
        const response = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${location1};${location2}?overview=false`
        );
        console.log("fastio", response.data);
        return response.data.routes[0].distance;
    } catch (error) {
        console.error("Error fetching road distance:", error);
        return null;
    }
};

export default function Home() {
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [saveError, setSaveError] = useState(null);
    const [distanceLine, setDistanceLine] = useState(null);
    const [distanceRoad, setDistanceRoad] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDistanceLine, setShowDistanceLine] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        setShowDistanceLine(!isOn);
    };

    const handleCalculateDistance = async (event) => {
        event.preventDefault(); // prevent form from submitting normally
        setLoading(true);
        setSaveError(null);
        setDistanceLine(null);
        setDistanceRoad(null);

        console.log("handleCalculateDistance called");

        const data1 = await fetchCoordinates(address1);
        const data2 = await fetchCoordinates(address2);

        console.log("Coordinates fetched:", { data1, data2 });

        if (data1 && data2) {
            let roadDistance;
            const calculatedDistance = haversineDistance(
                parseFloat(data1.lat),
                parseFloat(data1.lon),
                parseFloat(data2.lat),
                parseFloat(data2.lon)
            );
            try {
                roadDistance =
                    (await fetchRoadDistance(
                        `${data1.lon},${data1.lat}`,
                        `${data2.lon},${data2.lat}`
                    )) / 1000;
            } catch (error) {
                setDistanceRoad(0);
            }

            console.log("Calculated Linear Distance:", calculatedDistance);
            console.log("Calculated Road Distance:", roadDistance);

            try {
                console.log("Sending save request:", {
                    source: address1,
                    destination: address2,
                    distance_line: calculatedDistance,
                    distance_roads: roadDistance,
                });

                const response = await axios.post("/api/save-distance", {
                    source: address1,
                    destination: address2,
                    distance_line: calculatedDistance,
                    distance_roads: roadDistance,
                });

                console.log("Save response:", response.data);
                setSaveError(null);
                setDistanceLine(calculatedDistance);
                setDistanceRoad(roadDistance);
            } catch (err) {
                console.error("Error saving distance:", err);
                setSaveError("Failed to save distance.");
            }
        } else {
            console.error("Failed to fetch coordinates");
            setSaveError("Failed to fetch coordinates. Please try again.");
        }

        setLoading(false);
    };

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (angle) => angle * (Math.PI / 180);
        const R = 6371; // Radius of the Earth in kilometers

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in kilometers
        return distance;
    };

    return (
        <div className="container">
            <h1>Distance Calculator</h1>
            <form className="form" onSubmit={handleCalculateDistance}>
                <TogglerModeButton isOn={isOn} toggleSwitch={toggleSwitch} />

                <input
                    type="text"
                    placeholder="Enter Address 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Enter Address 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="input"
                />
                <button
                    type="submit"
                    // onClick={handleCalculateDistance}
                    className="button"
                    disabled={loading}
                >
                    {loading ? "Calculating..." : "Calculate Distance"}
                </button>
            </form>
            {loading && <div className="loader">Loading...</div>}
            {saveError && <div className="error">{saveError}</div>}
            {!loading && distanceLine && distanceRoad && (
                <div className="result">
                    {showDistanceLine ? (
                        <p>
                            Distance as the crow flies:{" "}
                            {distanceLine.toFixed(2)} km
                        </p>
                    ) : (
                        <p>
                            Distance travelled by road:{" "}
                            {distanceRoad.toFixed(2)} km
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
