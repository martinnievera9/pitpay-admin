import React from 'react';
import styled, { withTheme } from 'styled-components';
import { EventYearFilter } from 'components/Events/EventYearFilter';
import Spacer from 'components/Spacer';
import Anchor from 'components/Anchor';
import MobileContainer from 'components/MobileContainer';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { DateCard } from 'components/DateCard';
import Pagination from 'components/Pagination';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CardInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const EventsList = props => {
  let { data, match, currentPage, count, loading } = props;

  return (
    <div>
      <EventYearFilter />
      {data.map(item => (
        <Anchor to={`${match.url}/event/${item.id}`} key={0}>
          <MobileContainer>
            <FlexRow>
              <CardInfo>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 100 }}>
                    <DateCard item={item} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Text
                        type="heading"
                        fontSize={25}
                        lineHeight={28}
                        color="#fff"
                      >
                        {item.name}
                      </Text>
                      <Spacer size={10} />
                    </div>
                  </div>
                </div>
              </CardInfo>
              <div style={{ transform: 'rotate(-90deg)' }}>
                <Icon icon="chevron" size={22} color={'red'} />
              </div>
            </FlexRow>
          </MobileContainer>
        </Anchor>
      ))}
      <div style={{ backgroundColor: '#00001F', margin: 10, borderRadius: 5 }}>
        <Pagination
          count={loading ? 0 : count}
          perPage={15}
          currentPage={currentPage || 1}
          color={'#fff'}
        />
      </div>
      <Spacer size={40} />
    </div>
  );
};

export default withTheme(EventsList);
