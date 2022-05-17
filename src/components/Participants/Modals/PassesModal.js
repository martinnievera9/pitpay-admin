import dayjs from 'dayjs';
import React from 'react';
import { Modal } from 'components/Modal';
import { formatCustomDate } from 'shared/formatters';
import { useGetAllTickets } from '../gql';
import { Item, Wrapper, List, Label, Info, Flex } from './passesModalStyle';

export const PassesModal = ({ showModal, close }) => {
  const { data } = useGetAllTickets();
  const tickets = data?.getAllTickets;

  if (!tickets) return false;

  return (
    <Modal isVisible={showModal} hideModal={close} title="Passes on Sale">
      <Wrapper showModal={showModal}>
        <List>
          {tickets.map((ticket) => {
            const {
              id,
              color_code,
              name,
              start_date,
              end_date,
              price,
            } = ticket;
            return (
              <Item key={id} color={color_code ?? ''}>
                <div style={{ flex: 1 }}>
                  <Flex>
                    <Label>Pass:</Label> <Info>{name.toUpperCase()}</Info>
                  </Flex>
                  <Flex>
                    <Label>Dates: </Label>
                    <Info>
                      {end_date && start_date
                        ? `${formatCustomDate(start_date, 'MM DD-YYYY').format(
                            'MMM DD'
                          )} -
                          ${formatCustomDate(end_date, 'MM-DD-YYYY').format(
                            dayjs(start_date).format('MMM') ===
                              dayjs(end_date).format('MMM')
                              ? 'DD - YYYY'
                              : 'MMM DD-YYYY'
                          )}`.toUpperCase()
                        : start_date
                        ? formatCustomDate(start_date, 'MM-DD-YYYY')
                            .format('MMM DD - YYYY')
                            .toUpperCase()
                        : null}
                    </Info>
                  </Flex>
                  <Flex style={{ marginBottom: 0 }}>
                    <Label>Price:</Label> <Info>{`$${price}`}</Info>
                  </Flex>
                </div>
              </Item>
            );
          })}
        </List>
      </Wrapper>
    </Modal>
  );
};
