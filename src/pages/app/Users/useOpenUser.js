import { useEffect, useCallback } from 'react';
import qs from 'qs';

// If theres a user id in the url this opens the side panel for that user
export default handleOutClick => {
  const handleClick = useCallback(handleOutClick, []);

  useEffect(() => {
    let { user_id } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    if (user_id) {
      handleClick(user_id);
    } else {
      return;
    }
  }, [handleClick]);
};
