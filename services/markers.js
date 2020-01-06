import { get } from '../utils/request';

/* global google */

export const createMarker = () => {

};

export const getMarkers = async (map) => {
  const bounds = map.getBounds();

  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  const north = northEast.lat();
  const south = southWest.lat();
  const east = northEast.lng();
  const west = southWest.lng();

  const path = `/markers?north=${north}&south=${south}&east=${east}&west=${west}`;

  const response = await get(path);

  return response.json();
};

export const drawMarkers = (map, markersPositionToInclude) => markersPositionToInclude.map(({
  id,
  lat,
  lng,
}) => new google.maps.Marker({
  id,
  map,
  position: { lat, lng },
}));

export const cleanMarkers = (markersToExclude) => {
  markersToExclude.forEach((marker) => marker.setMap(null));
};
