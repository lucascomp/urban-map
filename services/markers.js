import { get, put } from '../utils/request';
import BeepIcon from '../resources/icons/beep.svg';
import BrailleIcon from '../resources/icons/braille.svg';
import LowVisionAccessIcon from '../resources/icons/low-vision-access.svg';
import SignLanguageIcon from '../resources/icons/sign-language.svg';
import WheelchairIcon from '../resources/icons/wheelchair.svg';

/* global google */

const getAccessibilityIcon = (id) => {
  switch (id) {
    case 1:
      return BeepIcon;
    case 2:
      return BrailleIcon;
    case 3:
      return LowVisionAccessIcon;
    case 4:
      return SignLanguageIcon;
    case 5:
      return WheelchairIcon;
    default:
      return undefined;
  }
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

export const createMarker = ({
  lat,
  lng,
  userId,
  accessibilityId,
}) => put('/markers', {
  lat,
  lng,
  userId,
  accessibilityId,
});

export const drawMarkers = (map, markersPositionToInclude) => markersPositionToInclude.map(({
  'accessibility.id': accessibilityId,
  id,
  lat,
  lng,
}) => new google.maps.Marker({
  icon: {
    scaledSize: new google.maps.Size(35, 35),
    url: getAccessibilityIcon(accessibilityId),
  },
  id,
  map,
  position: { lat, lng },
}));

export const drawRegisterMarker = (map) => new google.maps.Marker({
  map,
  draggable: true,
});

export const cleanMarkers = (markersToExclude) => {
  markersToExclude.forEach((marker) => marker.setMap(null));
};

export const removeListener = (listener) => {
  google.maps.event.removeListener(listener);
};
