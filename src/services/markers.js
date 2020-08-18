import { get, post, put } from '../utils/request';
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

export const editMarker = ({
  id,
  lat,
  lng,
  description,
  userId,
  accessibilityId,
}) => post('/markers', {
  id,
  lat,
  lng,
  description,
  userId,
  accessibilityId,
});

export const drawMarkers = (
  map,
  markersPositionToInclude,
  onEdit,
) => markersPositionToInclude.map(({
  'accessibility.id': accessibilityId,
  'accessibility.name': accessibilityName,
  id,
  lat,
  lng,
  description,
}) => {
  const marker = new google.maps.Marker({
    accessibilityId,
    description,
    icon: {
      scaledSize: new google.maps.Size(35, 35),
      url: getAccessibilityIcon(accessibilityId),
    },
    id,
    map,
    position: { lat, lng },
  });

  marker.addListener('click', () => {
    const infoWindowContent = `
      <div>
        <h4>${accessibilityName}</h4>
      </div>
      ${description ? `
        <div style="margin-top: 8px;">
          <p>${description}</p>
        </div>
      ` : ''}
    `;

    if (infoWindow) {
      infoWindow.close();
      infoWindow.setContent(infoWindowContent);
    } else {
      infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        maxWidth: 250,
      });
    }

    infoWindow.open(map, marker);
  });

  marker.addListener('rightclick', () => {
    onEdit(marker);
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
