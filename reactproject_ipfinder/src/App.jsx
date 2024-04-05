// App.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

import "./App.css";
import 'leaflet/dist/leaflet.css'; // Inklusion of this file requires setting a height of .leaflet-container explicitly -> App.css

function App() {
    const [ipAddress, setIpAddress] = useState('');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                setIpAddress(ipData.ip);
                return ipData.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        const fetchLocation = async (ipAddress) => {
            try {
                const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
                const locationData = await locationResponse.json();
                setLocation(locationData);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        const fetchData = async () => {
            try {
                const ip = await fetchIpAddress();
                await fetchLocation(ip);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="header-block">
                <h1>Your IP Address</h1>
                <p>{ipAddress}</p>
            </div>
            {location && (
                <div>
                    <div className="header-block">
                        <h1>Your Location</h1>
                        <p>City: {location.city}</p>
                        <p>Region: {location.regionName}</p>
                        <p>Country: {location.country}</p>
                        <p>Latitude: {location.lat}</p>
                        <p>Longitude: {location.lon}</p>
                    </div>
                    <MapContainer center={[location.lat, location.lon]} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[location.lat, location.lon]}>
                            <Popup>
                                <div className="popup-block">
                                    <h2>Your Location</h2>
                                    <p>City: {location.city}</p>
                                    <p>Region: {location.regionName}</p>
                                    <p>Country: {location.country}</p>
                                    <p>Latitude: {location.lat}</p>
                                    <p>Longitude: {location.lon}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
    );
}

export default App;
