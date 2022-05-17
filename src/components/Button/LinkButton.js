import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export const LinkButton = ({ to, children }) => {
  return (
    <Link
      style={{
        borderRadius: 5,
        backgroundColor: '#fa4616',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        textDecoration: 'none',
        color: '#fff',
        fontFamily: 'Barlow Condensed',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        display: 'block',
        lineHeight: 1.2,
        textTransform: 'uppercase',
      }}
      to={to}
    >
      {children}
    </Link>
  );
};
LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
