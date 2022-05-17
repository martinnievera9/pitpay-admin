import React from 'react';

import GetSeriesDetail from '../gql/queries/get-series-detail';
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

const SeriesHeader = ({ data, margin }) => {
  const theme = useTheme();

  if (!data || !data.getSeriesDetail) return null;

  return (
    <Container margin={margin}>
      <TrackLogo>
        <img
          style={{ width: '100%', height: 'auto', display: 'block' }}
          src={data.getSeriesDetail ? data.getSeriesDetail.logo : ''}
          alt="logo"
        />
      </TrackLogo>
      <Column>
        <ColumnText>
          <Text fontSize={24} lineHeight={29} type="heading">
            {data.getSeriesDetail ? data.getSeriesDetail.name : ''}
          </Text>
        </ColumnText>
      </Column>
      <Column>
        <ColumnIcon>
          <Icon icon="location" size={20} color={theme.colors.text.black} />
        </ColumnIcon>
        <ColumnText>
          <Text fontSize={18} lineHeight={28}>
            {data.getSeriesDetail ? data.getSeriesDetail.website : ''}
          </Text>
        </ColumnText>
      </Column>
      <Column noBorder>
        <ColumnIcon>
          <Icon icon="flag" size={20} color={theme.colors.text.black} />
        </ColumnIcon>
        <ColumnText>
          <Text fontSize={18} lineHeight={28}>
            {data.getSeriesDetail && data.getSeriesDetail.type
              ? data.getSeriesDetail.type.key
              : ''}
          </Text>
        </ColumnText>
      </Column>
    </Container>
  );
};

export default GetSeriesDetail(SeriesHeader);
