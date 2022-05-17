import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Icon from 'components/Icon';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

const Overlay = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s linear;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  text-align: center;
  overflow: auto;
`;

const OverlayClose = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
`;

const maxModalWidth = `600px`;

const ModalWindow = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 11px 0 rgba(0, 0, 0, 0.18);
  box-shadow: none;
  margin: auto;
  max-height: calc(100% - 120px);
  overflow: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 80px;
  z-index: 8000;

  width: calc(100% - 20px);
  max-width: ${(props) =>
    props.maxWidth
      ? typeof props.maxWidth === 'number'
        ? `${props.maxWidth}px`
        : props.maxWidth
      : maxModalWidth};

  @media screen and (min-width: 861px) {
    max-width: ${(props) =>
      props.maxWidth
        ? typeof props.maxWidth === 'number'
          ? `${props.maxWidth}px`
          : props.maxWidth
        : maxModalWidth};
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
  padding: 13px 15px;
`;

const ModalBodyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 15px;
`;

export const disableContentScroll = () => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
};

export const enableContentScroll = () => {
  // We only want to do all this if scrolling was previously disabled
  if (document.body.style.position === 'fixed') {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
};

export const Modal = ({
  children,
  closable = true,
  header,
  hideModal,
  isVisible,
  modalStyle,
  maxWidth,
  noHeader,
  title,
  body,
}) => {
  const [modalRoot, setModalRoot] = useState('');
  const theme = useTheme();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  useEffect(() => {
    return () => enableContentScroll();
  }, []);

  useEffect(() => {
    if (isVisible) {
      disableContentScroll();
    } else {
      enableContentScroll();
    }
  }, [isVisible]);

  if (!modalRoot) return null;

  const Header = header ?? null;

  return ReactDOM.createPortal(
    <Overlay visible={isVisible}>
      <OverlayClose /* onClick={hideModal} */ />
      <ModalWindow visible={isVisible} style={modalStyle} maxWidth={maxWidth}>
        {noHeader ? null : Header ? (
          Header
        ) : (
          <ModalButtonRow>
            <Text type="heading" inlineStyle={{ whiteSpace: 'normal' }}>
              {title ?? ''}
            </Text>
            {closable && (
              <div style={{ transform: 'rotate(45deg)' }}>
                <Icon
                  icon="plus"
                  color={theme.colors.primary}
                  size={22}
                  onClick={hideModal}
                />
              </div>
            )}
          </ModalButtonRow>
        )}
        {body && (
          <ModalBodyRow>
            <Text type="label" inlineStyle={{ marginHorizontal: 20 }}>
              {body}
            </Text>
          </ModalBodyRow>
        )}
        {children}
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export const modalPropTypes = {
  closable: PropTypes.bool,
  header: PropTypes.node,
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  modalStyle: PropTypes.object,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noHeader: PropTypes.bool,
};

Modal.propTypes = {
  ...modalPropTypes,
};
