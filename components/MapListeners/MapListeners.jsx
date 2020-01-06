import { useEffect, useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import { getMarkers, drawMarkers, cleanMarkers } from '../../services/markers';
import { arrayDiff, arrayIntersection } from '../../utils/array';
import { markerComparator } from '../../utils/marker';

/* global google */

const MapListeners = () => {
  const [markers, setMarkers] = useState([]);
  const map = useGoogleMap();

  useEffect(() => {
    const idleListener = map.addListener('idle', async () => {
      const newMarkersPosition = await getMarkers(map);

      const markersPositionToInclude = arrayDiff(newMarkersPosition, markers, markerComparator);
      const markersToExclude = arrayDiff(markers, newMarkersPosition, markerComparator);

      if (markersPositionToInclude.length === 0 && markersToExclude.length === 0) {
        return;
      }

      const markersToKeep = arrayIntersection(markers, newMarkersPosition, markerComparator);
      const newMarkers = drawMarkers(map, markersPositionToInclude);

      cleanMarkers(markersToExclude);
      setMarkers([...markersToKeep, ...newMarkers]);
    });

    return () => google.maps.event.removeListener(idleListener);
  });

  return null;
};

export default MapListeners;
