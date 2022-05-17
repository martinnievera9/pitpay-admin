import React, { useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import LineHeightText from 'components/LineHeightText';
import Pagination from 'components/Pagination';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import Text from 'components/Text';
import { formatTimestamp } from 'shared/formatters';
import GetCustomerTransaction from '../gql/queries/get-customer-transactions';
import PassesModal from '../../../app/Users/passesModal';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const OpenModal = styled.button`
  color: #fa4616;
  font-size: 16px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  font-family: 'Roboto';
  text-decoration: underline;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Transactions = (props) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  if (!data.getCustomerTransactions) return false;

  return (
    <>
      <Container>
        <ContainerHeader>
          <TitleContainer>
            <Text
              type="heading"
              color="#3C4144"
              inlineStyle={{ marginRight: 25, width: 400 }}
            >
              Transaction History
            </Text>
          </TitleContainer>
        </ContainerHeader>
        <div style={{ padding: 20 }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col">Date</TableCell>
                <TableCell scope="col">Event Name</TableCell>
                <TableCell scope="col">Track Name</TableCell>
                <TableCell scope="col">Total</TableCell>
                <TableCell scope="col">Fee</TableCell>
                <TableCell scope="col">Discount</TableCell>
                <TableCell scope="col">Refund</TableCell>

                <TableCell scope="col" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.getCustomerTransactions.results.length ? (
                data.getCustomerTransactions.results.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <LineHeightText>
                          {formatTimestamp(
                            Number(item.purchase_date),
                            'h:mm a, MMM DD, YYYY',
                            true
                          )}
                        </LineHeightText>
                      </TableCell>
                      <TableCell>
                        <OpenModal onClick={() => setShowModal(item)}>
                          {item.event?.name}
                        </OpenModal>
                      </TableCell>
                      <TableCell>
                        <LineHeightText>{item.track?.name} </LineHeightText>
                      </TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell>{item.fee}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell>{item.refund}</TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <p style={{ marginTop: 20 }}>No transactions for this user</p>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {showModal ? (
          <PassesModal
            currentTransaction={showModal}
            close={() => setShowModal(null)}
          />
        ) : null}

        <Pagination
          count={props.data.getCustomerTransactions.count}
          perPage={15}
          currentPage={currentPage || 1}
        />
      </Container>
    </>
  );
};

export default GetCustomerTransaction(Transactions);
