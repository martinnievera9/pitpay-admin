import React from 'react';

import GetTrack from '../gql/queries/get-track';

import useTheme from 'hooks/useTheme';
import Icon from 'components/Icon';
import Text from 'components/Text';

import {
  Container,
  Column,
  ColumnIcon,
  ColumnText,
  TrackLogo
} from './StyledHeader';

const TrackHeader = ({ data, margin }) => {
  const theme = useTheme();
  if (!data.getTrack) return false;

  return data.loading ? (
    <div />
  ) : data.getTrack ? (
    <Container margin={margin}>
      <TrackLogo>
        <img
          style={{ width: '100%', height: 'auto', display: 'block' }}
          src={data.getTrack ? data.getTrack.logo : ''}
          alt="logo"
        />
      </TrackLogo>
      <Column>
        <ColumnText>
          <Text fontSize={24} lineHeight={29} type="heading">
            {data.getTrack ? data.getTrack.name : ''}
          </Text>
          <Text fontSize={18} lineHeight={28}>
            {data.getTrack ? data.getTrack.cityAndState : ''}
          </Text>
        </ColumnText>
      </Column>
      <Column>
        <ColumnIcon>
          <Icon icon="location" size={20} color={theme.colors.text.black} />
        </ColumnIcon>
        <ColumnText>
          <Text fontSize={18} lineHeight={28}>
            {data.getTrack ? data.getTrack.street : ''}
          </Text>
          <Text fontSize={18} lineHeight={28}>
            {`${data.getTrack.city ? data.getTrack.city : null}, ${
              data.getTrack.state ? data.getTrack.state : null
            } ${data.getTrack.zipcode ? data.getTrack.zipcode : null}`}
          </Text>
        </ColumnText>
      </Column>
      <Column noBorder>
        <ColumnIcon>
          <Icon icon="flag" size={20} color={theme.colors.text.black} />
        </ColumnIcon>
        <ColumnText>
          <Text fontSize={18} lineHeight={28}>
            {data.getTrack && data.getTrack.type ? data.getTrack.type.key : ''}
          </Text>
          <Text fontSize={18} lineHeight={28}>
            {data.getTrack.size}
          </Text>
        </ColumnText>
      </Column>
    </Container>
  ) : null;
};

export default GetTrack(TrackHeader);
