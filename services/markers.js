import { get, put } from '../utils/request';
import BeepIcon from '../resources/icons/beep.svg';
import BrailleIcon from '../resources/icons/braille.svg';
import LowVisionAccessIcon from '../resources/icons/low-vision-access.svg';
import SignLanguageIcon from '../resources/icons/sign-language.svg';
import WheelchairIcon from '../resources/icons/wheelchair.svg';

/* global google */

let infoWindow;

const getAccessibilityIcon = (id) => {
  switch (id) {
    case 1:
      return WheelchairIcon;
    case 2:
      return BeepIcon;
    case 3:
      return LowVisionAccessIcon;
    case 4:
      return SignLanguageIcon;
    case 5:
      return BrailleIcon;
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
  description,
  userId,
  accessibilityId,
}) => put('/markers', {
  lat,
  lng,
  description,
  userId,
  accessibilityId,
});

export const drawMarkers = (map, markersPositionToInclude) => markersPositionToInclude.map(({
  'accessibility.id': accessibilityId,
  id,
  lat,
  lng,
  description,
}) => {
  const marker = new google.maps.Marker({
    accessibilityId,
    icon: {
      scaledSize: new google.maps.Size(35, 35),
      url: getAccessibilityIcon(accessibilityId),
    },
    id,
    map,
    position: { lat, lng },
  });

  marker.addListener('click', () => {
    if (infoWindow) {
      infoWindow.close();
      infoWindow.setContent(description);
    } else {
      infoWindow = new google.maps.InfoWindow({
        content: description,
        maxWidth: 200,
      });
    }

    infoWindow.open(map, marker);
  });

  return marker;
});

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

export const filterMarkers = (map, markers, accessbilitiesFilter) => {
  markers.forEach((marker) => {
    const { checked } = accessbilitiesFilter.find(({ id }) => marker.accessibilityId === id);

    if (checked) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });
};
