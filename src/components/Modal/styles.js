import styled from 'styled-components';

export const ModalHeaderContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray['200']};
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const ModalSectionHeaderContainer = styled(ModalHeaderContainer)`
  border-bottom-color: ${props => props.theme.colors.gray['A100']};
  align-items: center;
  height: ${props => props.height ?? '54px'};
  padding: 0 15px;
`;
