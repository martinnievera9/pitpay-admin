import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_WEATHER = gql`
  query GetWeather {
    getWeather {
      dailyRange {
        low
        high
      }
      hours {
        timestamp
        shortDescription
        longDescription
        precipitation
        temp
        icon
      }
    }
  }
`;

export function useGetWeather() {
  return useQuery(GET_WEATHER);
}
