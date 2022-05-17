import { useCallback } from 'react';
import useGoogleMap from 'hooks/useGoogleMaps';

export const useRadarMap = ({ lat, lng }) => {
  const options = useCallback(
    (google) => ({
      zoom: 9,
      center: new google.maps.LatLng(lat, lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      minZoom: 8,
      maxZoom: 11,
      restriction: {
        latLngBounds: {
          north: lat + 6,
          south: lat - 6,
          west: lng - 6,
          east: lng + 6,
        },
        strictBounds: true,
      },
    }),
    [lat, lng]
  );

  const initialize = useCallback(
    (map, google) => {
      new google.maps.Marker({ position: { lat, lng }, map: map });

      const tileNEX = new google.maps.ImageMapType({
        getTileUrl: function (tile, zoom) {
          return (
            `http://maps.aerisapi.com/${process.env.REACT_APP_AERIS_CLIENT_KEY}_${process.env.REACT_APP_AERIS_SECRET_KEY}/alerts-heat:80,alerts-flood:80,alerts-severe:80,radar:80,lightning-strikes-5m-icons:95,stormcells-major:87/` +
            zoom +
            '/' +
            tile.x +
            '/' +
            tile.y +
            `/current.png`
          );
        },
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.9,
        name: 'NEXRAD',
        isPng: true,
      });

      map.overlayMapTypes.push(tileNEX);
    },
    [lat, lng]
  );

  useGoogleMap({
    options,
    initialize,
    getElement: () => document.getElementById('radarmap'),
  });
};
