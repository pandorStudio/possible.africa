import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { geocodeByAddress } from 'react-places-autocomplete';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ location }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await geocodeByAddress(location);
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat, lng });
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    fetchData();
  }, [location]);

  return (

       <MapContainer center={{ lat: 0, lng: 0 }} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
  </MapContainer>

  );
};

export default MapComponent;
