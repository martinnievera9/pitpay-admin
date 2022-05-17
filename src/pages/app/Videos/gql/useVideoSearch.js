import qs from 'qs';
import { useLocation } from 'react-router-dom';

export function useVideoSearch() {
  const { search } = useLocation();
  const input = qs.parse(search, { ignoreQueryPrefix: true });
  return { input, queryString: input.queryString || '' };
}
