import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { StateCenters } from '../types/stateCenters';
import rawCenters from '../geojson/us-states.json';
import  {CONFIG} from '../config/appConfig';
const STATE_CENTERS = rawCenters as unknown as StateCenters;

interface ZoomToStateProps {
  selectedState: string;
}


const ZoomToState = ({ selectedState }: ZoomToStateProps) => {
  const map = useMap();

  useEffect(() => {

    if (!map) return;

    if (!selectedState) {
      // All States selected — zoom out
      map.flyTo(CONFIG.DEFAULT_COORDS, CONFIG.DEFAULT_ZOOM);
      return;
    }
    const coords = STATE_CENTERS[selectedState];
    if (coords) {
      map.flyTo(coords, 7); // or whatever zoom you prefer
    }
  }, [selectedState, map]);

  return null;
};

export default ZoomToState;
