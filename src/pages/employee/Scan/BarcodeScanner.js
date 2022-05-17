import QrReader from 'modern-react-qr-reader';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import styled from 'styled-components';
import { useCheckInUser } from 'components/Participants/gql/useCheckInUser';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import { logDevError } from 'shared/alerts';
import { query as newBarcode } from './gql/new-barcodes';
import { useGetBarcodes } from './gql/useGetBarcodes';
import ScanMessage from './ScanMessage';
import useSetAlert from './useSetAlert';

const MessageWrapper = styled.div`
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  position: absolute;
  font-family: 'Barlow Condensed';
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.p`
  color: #fff;
  font-size: 24px;
  font-family: 'Barlow Condensed';
  font-weight: 600;
  margin-top: 30px;
`;

const Subtext = styled.ul`
  list-style: disc;
  list-style-position: inside;
  padding: 0 0 0 0;
  margin: 10px 0 0 0;

  li {
    color: #fff;
    font-size: 16px;
    font-family: 'Barlow Condensed';
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

const BarcodeScanner = () => {
  const { data, subscribeToMore } = useGetBarcodes();
  const { id } = useParams();
  const { search } = useLocation();
  const isOffline = useOfflineCheck();
  const [alert, setAlert] = useSetAlert();
  const checkInUser = useCheckInUser();
  const eventId = Number(id);

  const { date } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: newBarcode,
      variables: {
        input: {
          event_id: eventId,
          date,
        },
      },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) return previous;

        return Object.assign({}, previous, {
          getBarcodes: subscriptionData.data.newBarcode.reduce(
            (acc, barcode) => {
              const index = acc.findIndex((pass) => pass.id === barcode.id);
              if (-1 !== index) {
                acc[index] = barcode;
                return acc;
              } else {
                return acc.concat([barcode]);
              }
            },
            previous.getBarcodes
          ),
        });
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, eventId, data, date]);

  if (!data?.getBarcodes) return null;

  return (
    <div
      style={{
        position: 'relative',
        height: 'calc(100vh - 160px)',
        backgroundColor: '#000',
      }}
    >
      <div>
        {isOffline ? (
          <ScanMessage>
            Your are offline, we will prompt you to sync users once you are back
            online
          </ScanMessage>
        ) : null}
      </div>
      {alert ? (
        alert.error ? (
          <MessageWrapper>
            <ScanMessage color={'red'}>Invalid Pass or Scan!</ScanMessage>
            <Header>Scan Error?</Header>
            <Subtext>
              <li>
                {'tickethoss' === process.env.REACT_APP_PLATFORM
                  ? 'Check the Ticket In Using the Spectator List'
                  : 'Check the Participant In Using the Participant List'}
              </li>
              <li>Have the Participant Verify Their Transaction History</li>
            </Subtext>
          </MessageWrapper>
        ) : (
          <MessageWrapper>
            <ScanMessage color={alert.color}>{alert.message}</ScanMessage>
          </MessageWrapper>
        )
      ) : (
        <QrReader
          delay={100}
          onError={(error) => logDevError(error)}
          onScan={async (code) => {
            if (!code) return;
            const key =
              'tickethoss' === process.env.REACT_APP_PLATFORM
                ? 'gaBarcode'
                : 'barcode';
            const pass = data.getBarcodes.find((item) => item[key] === code);

            // if the pass doesnt exist, show an error
            if (!pass)
              return setAlert(
                'tickethoss' === process.env.REACT_APP_PLATFORM
                  ? `Invalid Ticket`
                  : `Invalid Pass`,
                'red',
                4000,
                true
              );

            // if the pass is already been scanned today, show message
            if (pass.is_checked) {
              return setAlert(
                'tickethoss' === process.env.REACT_APP_PLATFORM
                  ? `This Ticket has already Checked In`
                  : `Participant has already Checked In`,
                'red',
                4000
              );
            }

            // if they are not scanned yet, check them in
            setAlert(
              'tickethoss' === process.env.REACT_APP_PLATFORM
                ? `Ticket is Checked In`
                : `Pass is Checked In`,
              'green',
              2000
            );

            await checkInUser([pass.id]);
          }}
          style={{ width: '100%' }}
        />
      )}
      {/* <SyncButton /> */}
    </div>
  );
};

export default BarcodeScanner;
