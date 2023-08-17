import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoanCalculator.css';

const Error = ({ message }) => {
  return <div className="error">{message}</div>;
};

export default Error;