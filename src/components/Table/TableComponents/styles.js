import styled, { css } from 'styled-components';

// import { genericStyles } from '../../utils';
// import { defaultProps } from '../../default-props';

const SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};

const sizeStyle = css`
  width: ${props =>
    SIZE_MAP[props.size] || props.theme.global.size[props.size]};
  max-width: ${props =>
    SIZE_MAP[props.size] || props.theme.global.size[props.size]};
  overflow: hidden;
`;

const StyledTableCell = styled.td`
  margin: 0;
  padding: 35px 4px;
  font-weight: inherit;
  vertical-align: middle;
  box-sizing: border-box;
  border: 0;
  text-align: ${props => props.textAlign ?? 'inherit'};
  ${props => props.scope && `font-weight: 500`};
  ${props => props.size && sizeStyle}
  ${props => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
  ${props => props.tableContextTheme && props.tableContextTheme.extend};

  ${props =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.isDeleted && `background-color: #FFEDEF!important`}
`;

const StyledTableDataCaption = styled.caption`
  display: none;
`;

function rowColorStyle(props) {
  const rowColors = {
    orange: css`
      background-color: ${props.theme.colors.primaryOpacity(0.1)};
      color: ${props.theme.colors.text.gray};
    `
  };
  return rowColors[props.highlight];
}

const sortableRowStyle = css`
  cursor: move;
  &.sortable-ghost {
    background-color: ${props => props.theme.colors.border};
  }
  &.sortable-drag {
    background-color: ${props => props.theme.colors.primaryOpacity(0.2)};
  }
`;

const StyledTableRow = styled.tr`
  ${props => props.highlight && rowColorStyle(props)}
  border-color: ${props => props.theme.colors['border-light']};
  height: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme.colors['border-light']};
  border-right: 0;
  border-left: 0;

  &:first-child {
    border: 0;
  }

  ${props => props.isDeleted && 'background-color: #FFEDEF'}
  ${props => props.sortable && sortableRowStyle}

  @media only screen and (max-width: 1024px) {
    ${
      '' /* // eslint-disable-next-line prettier/prettier
    ${StyledTableCell}:nth-child(2) {
      padding-left: 76px;
    } */
    }

    // eslint-disable-next-line prettier/prettier
    ${StyledTableCell}:nth-last-child(2) {
      ${'' /* padding for email */}
      ${'' /* padding-right: 176px; */}
    }
  }
`;

const StyledTableBody = styled.tbody``;

const StyledTableHeader = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors['border-light']};
`;

const StyledTableFooter = styled.tfoot``;

const StyledTable = styled.table`
  width: 100%;
  /* min-width: 1000px; */
  border-spacing: 0;
  border-collapse: collapse;
  width: inherit;
  ${props => props.theme.table && props.theme.table.extend};
`;

export {
  StyledTableCell,
  StyledTableDataCaption,
  StyledTableRow,
  StyledTableBody,
  StyledTableHeader,
  StyledTableFooter,
  StyledTable
};
