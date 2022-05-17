import dayjs from 'dayjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import {
  CardText,
  CardLabel,
  CardContent,
  Card,
} from 'components/Card/cardStyle';
import Container from 'components/Container';
import Icon from 'components/Icon';
import DeletePromo from '../gql/mutations/delete-promo';
import PromoEdit from '../PromosEdit';
import GetPromo from './gql/get-promo.js';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const Promos = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [newPromo, setNewPromo] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const adminTrack = window.location.pathname.indexOf('/admin-track');

  const handleOutClick = () => {
    setEditPromo(null);
    setShowModal(false);
    setNewPromo(false);

    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 300);
  };

  if (!props.data.getPromo) return false;

  return props.data.loading ? (
    <div />
  ) : (
    <Container>
      <div style={{ padding: 20 }}>
        <Card key={props.data.getPromo.id}>
          {adminTrack === 0 ? null : (
            <CardText>
              <CardLabel style={{ width: '40%' }}>Issuer: </CardLabel>
              <CardContent style={{ width: '60%' }}>
                {props.data.getPromo.issuer || 'Admin'}
              </CardContent>
            </CardText>
          )}
          <CardText>
            <CardLabel style={{ width: '40%' }}>Code Name: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {props.data.getPromo.name}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Expiration: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {props.data.getPromo.expiration
                ? dayjs(props.data.getPromo.expiration).format('MMM DD - YYYY')
                : 'None'}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Pass Disc. %: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {`${
                props.data.getPromo.ticket_discount
                  ? `${props.data.getPromo.ticket_discount}%`
                  : 'N/A'
              }`}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Pass Disc. $: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {`${
                props.data.getPromo.dollar_amount
                  ? currency.format(props.data.getPromo.dollar_amount)
                  : 'N/A'
              }`}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Fee Disc. %: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {`${props.data.getPromo.service_discount}%` || 0}
            </CardContent>
          </CardText>
          <CardText>
            <CardLabel style={{ width: '40%' }}>Use Limit: </CardLabel>
            <CardContent style={{ width: '60%' }}>
              {props.data.getPromo.limit || 0}
            </CardContent>
          </CardText>
          <Icon
            icon="edit"
            size={23}
            color={props.theme.colors.primary}
            padding="0 15px 0 0"
            onClick={async () => {
              setEditPromo(props.data.getPromo.id);
              setIsVisible(true);
              setTimeout(() => {
                setShowModal(true);
              }, 300);
            }}
          />
          <Icon
            icon="trash"
            size={23}
            color={props.theme.colors.primary}
            onClick={async () => {
              const successMessage = () =>
                toast.success('Promo Successfully Deleted');
              const errorMessage = () => toast.error('Error Deleting Promo');

              if (
                window.confirm('Are you sure you want to delete this promo?')
              ) {
                const response = await props.deletePromo({
                  id: props.data.getPromo.id,
                });

                if (!response || response.errors) {
                  errorMessage();
                }
                successMessage();

                props.history.push(props.match.url.replace(/[0-9]/g, ''));
              }
            }}
          />
        </Card>
      </div>
      <PromoEdit
        newPromo={newPromo}
        isVisible={showModal}
        handleOutClick={handleOutClick}
        currentPromo={editPromo}
      />
    </Container>
  );
};

export default compose(GetPromo, DeletePromo)(withTheme(Promos));
