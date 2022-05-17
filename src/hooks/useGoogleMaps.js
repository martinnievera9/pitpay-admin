import { useEffect, useCallback } from 'react';
/* globals google */

export default function useGoogleMap({ initialize, options, getElement }) {
  let getElementCallback = useCallback(getElement, []);

  const renderMap = useCallback(() => {
    let element = getElementCallback();
    if (element) {
      initialize(new google.maps.Map(element, options(google)), google);
    }
  }, [options, initialize, getElementCallback]);

  useEffect(() => {
    let googleMapsScript = document.getElementById('googleMaps');

    if (googleMapsScript) {
      if (window.google) renderMap();
      return;
    }

    (function(d, script) {
      script = d.createElement('script');
      script.setAttribute('id', 'googleMaps');
      script.type = 'text/javascript';
      script.async = true;
      script.onload = function() {
        renderMap();
      };

      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ-NdoBdC061WIslrgykkyvZQiqJG0fdc';
      d.getElementsByTagName('body')[0].appendChild(script);
    })(document);
  }, [renderMap]);
}
