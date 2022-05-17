import React from 'react';
import useTheme from 'hooks/useTheme';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Spacer from 'components/Spacer';

import {
  Container,
  Column,
  ColumnIcon,
  ColumnText,
  TrackLogo
} from './StyledHeader';

const Header = ({
  name,
  logo,
  cityAndState,
  street,
  state,
  zipcode,
  city,
  type,
  size
}) => {
  const theme = useTheme();

  return false ? (
    <div />
  ) : (
    <Container>
      <TrackLogo>
        <img
          style={{ width: '100%', height: 'auto', display: 'block' }}
          src={logo}
          alt="logo"
        />
      </TrackLogo>
      <Spacer size={10} />
      <Column>
        <ColumnText>
          <Text fontSize={24} lineHeight={29} type="heading">
            {name}
          </Text>
          {cityAndState ? (
            <Text fontSize={18} lineHeight={28}>
              {cityAndState}
            </Text>
          ) : null}
        </ColumnText>
      </Column>
      <Spacer size={10} />
      <Column hideMobile>
        <ColumnIcon>
          <Icon icon="location" size={20} color={theme.colors.text.black} />
        </ColumnIcon>

        <ColumnText>
          {street ? (
            <Text fontSize={18} lineHeight={28}>
              {street}
            </Text>
          ) : null}
          {city ? (
            <Text fontSize={18} lineHeight={28}>
              {`${city}, ${state} ${zipcode}`}
            </Text>
          ) : null}
        </ColumnText>
      </Column>
      <Spacer size={10} />
      <Column noBorder hideMobile>
        <ColumnIcon>
          <Icon icon="flag" size={20} color={theme.colors.text.black} />
        </ColumnIcon>
        {type ? (
          <ColumnText>
            <Text fontSize={18} lineHeight={28}>
              {type ? type : ''}
            </Text>
            <Text fontSize={18} lineHeight={28}>
              {size}
            </Text>
          </ColumnText>
        ) : null}
      </Column>
      <Spacer size={10} />
    </Container>
  );
};

export default Header;
