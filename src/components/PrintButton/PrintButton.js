import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { logDevError } from 'shared/alerts';
import { timeout } from 'shared/timeout';

const Container = styled.button`
  background-color: ${(props) =>
    props.variant === 'primary' ? props.theme.colors.primary : 'transparent'};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  padding: ${(props) => (props.variant === 'primary' ? '15px' : 0)};

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (min-width: 860px) {
    background-color: transparent;
    padding: 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${(props) => props.theme.colors.white};
    font-family: Roboto;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    margin-left: ${(props) => (props.variant === 'minimal' ? '10px' : '20px')};
    text-align: left;
  }

  svg {
    fill: ${(props) =>
      props.variant === 'minimal'
        ? props.theme.colors.primary
        : props.theme.colors.white};
    width: ${(props) => (props.variant === 'minimal' ? '22px' : '40px')};
  }

  @media (min-width: 860px) {
    flex-direction: column;
    margin: 0;
    border: 0;
    width: auto;

    svg {
      fill: ${(props) => props.theme.colors.primary};
      width: 40px;
    }

    span {
      color: ${(props) => props.theme.colors.text.header};
      font-size: 12px;
      margin-top: 10px;
      margin-left: 0px;
      text-align: center;
    }
  }
`;

export const PrintButton = (props) => {
  const {
    buildPdf,
    filename = 'Participant-List',
    style = {},
    text,
    variant = 'primary',
  } = props;
  const [disabled, setDisabled] = useState(false);

  function exportPdf(buildPdf) {
    return new Promise((resolve) => {
      const pdf = buildPdf();
      if (
        navigator.userAgent.includes('iPhone') &&
        navigator.maxTouchPoints > 1
      ) {
        var blob = new Blob([pdf.output('blob')], {
          type: 'data:application/pdf,',
        });
        FileSaver.saveAs(blob, filename + '.pdf');
      } else if (navigator.maxTouchPoints > 1) {
        pdf.output('datauri', filename + '.pdf');
      } else {
        window.open(
          pdf.output('bloburl', { filename: filename + '.pdf' }),
          '_blank'
        );
      }
      timeout(resolve, 6000);
    });
  }

  return (
    <Container
      style={style}
      disabled={disabled}
      onClick={async () => {
        setDisabled(true);
        try {
          await exportPdf(buildPdf);
        } catch (error) {
          logDevError(error);
          toast.error('Cannot dowload participants');
        }
        setDisabled(false);
      }}
      variant={variant}
    >
      <IconWrapper variant={variant}>
        <Icon icon="Print-Icon" />
        <span>{text}</span>
      </IconWrapper>
    </Container>
  );
};
PrintButton.propTypes = {
  buildPdf: PropTypes.func.isRequired,
  filename: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'minimal']),
};
