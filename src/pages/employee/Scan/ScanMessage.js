import React from 'react';

const ScanMessage = ({ children, color }) => {
  return (
    <div
      style={{
        padding: 20,
        backgroundColor: color,
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Barlow Condensed',
        fontWeight: 700,
        textAlign: 'center',
        width: '90%'
      }}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScanMessage;
