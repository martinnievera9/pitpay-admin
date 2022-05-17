import styled from "styled-components";

export const NoSuggestions = styled.div`
  color: #999;
  padding: 0.5rem;
`;

export const SuggestionList = styled.ul`
  background: #fff;
  border: 1px solid #d8d8d8;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  z-index: 100;
`;

export const SuggestionItem = styled.li`
  padding: 0.5rem;

  ${props =>
    props.active &&
    `
    background-color: #f7f5f5;
    cursor: pointer;
    font-weight: 700;
`}

  &:hover {
    background-color: #f7f5f5;
    cursor: pointer;
    font-weight: 700;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #d8d8d8;
  }
`;
