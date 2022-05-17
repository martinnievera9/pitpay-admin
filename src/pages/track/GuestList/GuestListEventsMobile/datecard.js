import React from 'react';
import styled from 'styled-components';
import Text from 'components/Text';

const DateCardWrapper = styled.div`
  border-radius: 5px;
  padding: ${(props) => (props.small ? '4px' : '8px')};
  background-color: ${(props) => props.theme.colors.primary};
  width: ${(props) => (props.small ? '50px' : '60px')};
  text-align: center;
  ${(props) => (props.margin ? props.margin : 'margin: 0 10px 10px 0')};
  text-transform: uppercase;
`;

const DateDay = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 0px 5px;
  text-align: center;
  display: inline-block;
  margin-bottom: 2px;
`;

const DateCard = ({ item, small, margin }) => {
  return (
    <DateCardWrapper small={small} margin={margin}>
      <DateDay>
        <Text
          type="heading"
          fontSize={small ? 14 : 20}
          lineHeight={small ? 14 : 20}
          color="black"
          fontWeight={700}
        >
          {item.isMultiDay && item.listDates ? item.month : item.day}
          {/* {moment(date, 'YYYY-MM-DD').format('ddd')} */}
        </Text>
      </DateDay>
      <div>
        <Text
          type="heading"
          fontSize={small ? 14 : 20}
          lineHeight={small ? 14 : 20}
          color="white"
          fontWeight={700}
        >
          {item.isMultiDay && item.listDates ? item.listDates : item.date}
          {/* {moment(date, 'YYYY-MM-DD').format('MMM DD')} */}
        </Text>
      </div>
    </DateCardWrapper>
  );
};

export default DateCard;
