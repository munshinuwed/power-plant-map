import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ZoomToState from './ZoomToState';
// import './mapView.css'; // optional styling

import type { Plant } from '../types/Plant';

// Fix Leaflet icon paths
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

// 🔄 Fit map bounds on plant updates
// const AutoZoom = ({ plants }: { plants: Plant[] }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!plants.length) return;

//     const bounds = L.latLngBounds(plants.map(p => [p.lat, p.lon]));
//     map.fitBounds(bounds, { padding: [40, 40] });
//   }, [plants, map]);

//   return null;
// };

const MapView = ({
     plants, selectedState }: { plants: Plant[]; selectedState: string }) => {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={13}
      style={{ width: '100%', height: '80vh', borderRadius: '1px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />

      {plants.map((plant, index) => (
        <Marker key={index} position={[plant.lat, plant.lon]}>
          <Popup>
            <strong>{plant.name}</strong><br />
            State: {plant.state}<br />
            Gen: {plant.absoluteGeneration.toLocaleString()} MWh<br />
            Share: {plant.statePercentage.toFixed(2)}%
          </Popup>
        </Marker>
      ))}

    <ZoomToState selectedState={selectedState} />
    </MapContainer>
  );
};

export default MapView;
