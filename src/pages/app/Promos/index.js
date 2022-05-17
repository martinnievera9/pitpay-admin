/* eslint-disable */
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import GetPromos from './gql/queries/get-promos';
import DeletePromo from './gql/mutations/delete-promo';
import Icon from 'components/Icon';
import { SearchableListContainer } from 'components/SearchableListContainer';
import Text from 'components/Text';
import PromosEdit from './PromosEdit';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';

import { HideOnMobile, HideOnDesktop } from 'components/Card/cardStyle';
import dayjs from 'dayjs';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const Promos = ({ match, history, data, deletePromo, location, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPromo, setNewPromo] = useState(false);

  const handleOutClick = () => {
    setEditPromo(null);
    setShowModal(false);
    setNewPromo(false);
    setIsVisible(!isVisible);
  };

  const adminTrack = window.location.pathname.indexOf('/admin-track');

  if (!data.getPromos) return false;

  return data.loading ? (
    <div />
  ) : (
    <>
      <SearchableListContainer
        onAddClick={() => {
          setIsVisible(true);
          setNewPromo(true);
          setShowModal(true);
        }}
        paginated
        pageCount={data.getPromos.count}
        searchInputPlaceholder="Search Promos"
        title="Promo Codes"
      >
        <HideOnMobile>
          <Table>
            <TableHeader>
              <TableRow>
                {adminTrack === 0 ? null : (
                  <TableCell scope="col">Issuer</TableCell>
                )}
                <TableCell scope="col">Code Name</TableCell>
                <TableCell scope="col">Expiration</TableCell>
                <TableCell scope="col">Ticket Discount %</TableCell>
                <TableCell scope="col">Dollar Amount</TableCell>
                <TableCell scope="col">Fee Discount %</TableCell>
                <TableCell scope="col">Use Limit</TableCell>
                <TableCell scope="col" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.getPromos.results.map((item) => (
                <TableRow key={item.id}>
                  {adminTrack === 0 ? null : (
                    <TableCell>{item.issuer || 'Admin'}</TableCell>
                  )}
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.expiration
                      ? dayjs(item.expiration).format('MMM DD - YYYY')
                      : 'None'}
                  </TableCell>
                  <TableCell>
                    {item.ticket_discount ? `${item.ticket_discount}%` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {item.dollar_amount
                      ? currency.format(item.dollar_amount)
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{`${item.service_discount}%` || 0}</TableCell>
                  <TableCell>{item.limit}</TableCell>
                  <TableCell>
                    <Icon
                      icon="edit"
                      size={18}
                      color={props.theme.colors.primary}
                      padding="0 15px 0 0"
                      onClick={async () => {
                        setEditPromo(item.id);
                        setIsVisible(true);
                        setTimeout(() => {
                          setShowModal(true);
                        }, 300);
                      }}
                    />
                    <Icon
                      icon="trash"
                      size={18}
                      color={props.theme.colors.primary}
                      onClick={async () => {
                        const successMessage = () =>
                          toast.success('Promo Successfully Deleted');
                        const errorMessage = () =>
                          toast.error('Error Deleting Promo');

                        if (
                          window.confirm(
                            'Are you sure you want to delete this promo?'
                          )
                        ) {
                          const response = await deletePromo({
                            id: item.id,
                          });
                          if (!response || response.errors) {
                            errorMessage();
                          }
                          successMessage();
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </HideOnMobile>
        <HideOnDesktop>
          {data.getPromos.results.map((item) => (
            <Link
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none',
                marginBottom: 20,
              }}
              to={`${match.url}/${item.id}`}
            >
              <Text
                type="heading"
                color={props.theme.colors.secondary}
                inlineStyle={{ textTransform: 'uppercase' }}
              >
                {item.name}
              </Text>
              <div style={{ transform: 'rotate(-90deg)' }}>
                <Icon
                  size={22}
                  icon="chevron"
                  color={props.theme.colors.primary}
                />
              </div>
            </Link>
          ))}
        </HideOnDesktop>
      </SearchableListContainer>
      {isVisible && (
        <PromosEdit
          newPromo={newPromo}
          isVisible={showModal}
          handleOutClick={handleOutClick}
          currentPromo={editPromo}
        />
      )}
    </>
  );
};

export default withTheme(compose(GetPromos, DeletePromo)(Promos));
