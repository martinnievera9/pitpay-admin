import React from 'react';
import styled from 'styled-components';
import GetPromoterLists from '../gql/queries/getPromoterLists';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const PhoneWrapper = styled.div`
  margin-bottom: 40px;
  width: 50%;
`;

const Number = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
`;

const Phone = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  margin-top: 10px;
`;

const PromoterLists = ({ data }) => {
  if (!data || !data.getPromoterLists) return null;

  const formatStatistic = (number) =>
    number.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div style={{ marginBottom: 40, display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        {data.getPromoterLists.map((list) => {
          return (
            <Wrapper>
              <Number>{formatStatistic(list.recipient_count)}</Number>
              <p>{list.name}</p>
            </Wrapper>
          );
        })}
        <Wrapper>
          <Number>{formatStatistic(22)}</Number>
          <p>YTD Text Messages Sent</p>
        </Wrapper>
      </div>
      <PhoneWrapper>
        <p>Text to #</p>
        <Phone>{process.env.REACT_APP_TEXT_TO_NUMBER}</Phone>
      </PhoneWrapper>
    </div>
  );
};

export default GetPromoterLists(PromoterLists);
