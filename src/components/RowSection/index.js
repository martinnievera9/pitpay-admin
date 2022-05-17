import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RowSectionWrapper = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-left: ${props => props.pLeft};
`;
const LeftTextWrapper = styled.p`
    width:100px;
    margin-right: 15px;
`;

const RowSection = ({ children , leftText ,...rest }) => (
    <RowSectionWrapper {...rest}>
        {leftText ? <LeftTextWrapper>{leftText}</LeftTextWrapper> : null}
        {children}
    </RowSectionWrapper>
);

RowSection.propTypes = {
    pLeft:PropTypes.string,
    leftText:PropTypes.string,
    children:PropTypes.node
};

RowSection.defaultProps = {
    pLeft:'1.2rem',
    leftText:''
};

export default RowSection;
