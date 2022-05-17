import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.63);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 340px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const Text = styled.p`
  font-family: 'Barlow Condensed';
  font-weight: 600;
  font-size: 24px;
  color: rgb(0, 0, 31);
  display: block;
  padding: 0px 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpdateAlert = () => {
  let [showUpdateAlert, setUpdateAlert] = useState();

  useEffect(() => {
    const checkUpdate = () => {
      fetch(`/version.txt?_=${Date.now()}`)
        .then((res) => res.text())
        .then((version) => {
          if (
            !version.includes('<!') &&
            version.trim() !== process.env.REACT_APP_COMMIT_REF
          ) {
            setUpdateAlert(true);
          }
        });
    };
    checkUpdate();
    setInterval(checkUpdate, 3000);
  }, []);

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
        window.location.reload(true);
      });
    }
  };

  return (
    <p>
      {showUpdateAlert ? (
        <Modal>
          <Container>
            <Header>
              <Text style={{ textAlign: 'center', lineHeight: 1.4 }}>
                The Pit Pay Software has been updated.
              </Text>
            </Header>
            <Wrapper>
              <Button
                type="button"
                buttonColor={'#fa4616'}
                onClick={updateServiceWorker}
                style={{ width: 200 }}
              >
                Update
              </Button>
            </Wrapper>
          </Container>
        </Modal>
      ) : null}
    </p>
  );
};

export default UpdateAlert;
