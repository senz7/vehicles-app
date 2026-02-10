import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Car } from "../../types/car";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  cars: Car[];
}

const CarMap: React.FC<Props> = ({ cars }) => {
  const center: [number, number] = [59.95, 30.3]; // <--- LatLngTuple

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {cars.map((car) => (
        <Marker key={car.id} position={[car.latitude, car.longitude]}>
          <Popup>
            <div>
              <h3 className="font-bold">{car.name}</h3>
              <p>{car.model}</p>
              <p>{car.year}</p>
              <p>${car.price.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CarMap;
