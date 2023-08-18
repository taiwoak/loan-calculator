import React, { useState } from 'react';
import Error from './Error';
import 'bootstrap/dist/css/bootstrap.css';
import './LoanCalculator.css';
import calculator from '../assets/calculator-icon.svg';
import toggleoff from '../assets/toggle-off.svg';
import toggleon from '../assets/toggle-on.svg';
import gtco from '../assets/gtco-logo.png';

const LoanCalculator = () => {
//   const [loanType, setLoanType] = useState('personal');
  const [dateType, setDateType] = useState('year');
  const [loanType, setLoanType] = useState('');
  const [repaymentOptions, setRepaymentOptions] = useState('month');
  const [loanAmount, setLoanAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [totalRepayment, setTotalRepayment] = useState(0);
//   const [totalInterest, setTotalInterest] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanTermType, setLoanTermType] = useState('---'); 
  const [findIntRate, setFindIntRate] = useState(0); 
  const [loanIntRate, setLoanIntRate] = useState(0); 
  const [rateTotal, setRateTotal] = useState(0); 
  const [rateTermType, setRateTermType] = useState('---'); 
  const [error, setError] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [rateToggled, setRateToggled] = useState(false);
//   const [monthlyPaymentOption, setMonthlyPaymentOption] = useState(0);

  const resetState = () => {
    setTotalRepayment(0);
    // setTotalInterest(0);
    setMonthlyPayment(0);
    setRepaymentOptions('month');
    setLoanTermType('---');
    setFindIntRate(0);
    setLoanIntRate(0);
    setRateTotal(0);
    setRateTermType('---');
    setInterestRate('');
    setLoanType('');
    setLoanAmount('');
    setRepayAmount('');
    setLoanTerm('');
    setError(null);
  };




// Calculate the predefined Interest Rate
  const predefinedInterestRates = {
    type1: 21,
    type2: 17,
    type3: 21.6,
    type4: 19,
    type5: 16,
    type6: 15,
    type7: 23,
    type8: 20,
    type9: 20,
    type10: 20.04,
  };

  const calculateLoan = () => {
    resetState();
    if (!loanAmount || !loanTerm) {
        setError('All fields are required.');
        return;
    }


    const parsedAmount = parseFloat(loanAmount);
    const parsedInterestRate = parseFloat(interestRate) / 100;
    const parsedLoanTerm = parseInt(loanTerm);
    const parsedLoanTermMonths = parseInt(loanTerm)/12;
    let monthlyAmount;
    let totalAmount;
    let interestAmount;


// Calculate the loan repayment

switch (true) {
    // Case 1: Calculate total repayment with user input interest rate
    case !!interestRate:
        if ( dateType === "year") { 
            interestAmount = parsedAmount * parsedInterestRate * parsedLoanTerm;    
            totalAmount = parsedAmount + interestAmount;
                if ( repaymentOptions === "month" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 12);
                } else if ( repaymentOptions === "quarter" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 4);
                } else if ( repaymentOptions === "biannual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 2);
                } else if ( repaymentOptions === "annual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 1);
                }

            if (parsedLoanTerm === 1) {
                setLoanTermType(parsedLoanTerm + ' Year');
            } else {
                setLoanTermType(parsedLoanTerm + ' Years');
            }
    
        } else {
            interestAmount = parsedAmount * parsedInterestRate * parsedLoanTermMonths;
            totalAmount = parsedAmount + interestAmount;
                if ( repaymentOptions === "month" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 12);
                } else if ( repaymentOptions === "quarter" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 4);
                } else if ( repaymentOptions === "biannual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 2);
                } else if ( repaymentOptions === "annual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 1);
                }
    
            if (parsedLoanTerm === 1) {
                setLoanTermType(parsedLoanTerm + ' Month');
            } else {
                setLoanTermType(parsedLoanTerm + ' Months');
            }
        }
    break;

    // Case 2: Calculate total repayment with predefined interest rate
    case !!loanType:
        if (predefinedInterestRates[loanType]) {
            const predefinedInterestRate = predefinedInterestRates[loanType] / 100;
            const gtcoInterestRate = predefinedInterestRates[loanType]
            const parsedTypeInterestRate = parseFloat(predefinedInterestRate);
        if ( dateType === "year") { 
            interestAmount = parsedAmount * parsedTypeInterestRate * parsedLoanTerm;    
            totalAmount = parsedAmount + interestAmount;
                if ( repaymentOptions === "month" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 12);
                } else if ( repaymentOptions === "quarter" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 4);
                } else if ( repaymentOptions === "biannual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 2);
                } else if ( repaymentOptions === "annual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTerm * 1);
                }
    
            // if (parsedLoanTerm === 1) {
            //     setLoanTermType(parsedLoanTerm + ' Year');
            // } else {
            //     setLoanTermType(parsedLoanTerm + ' Years');
            // }
    
        } else {
            interestAmount = parsedAmount * parsedTypeInterestRate * parsedLoanTermMonths;
            totalAmount = parsedAmount + interestAmount;
                if ( repaymentOptions === "month" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 12);
                } else if ( repaymentOptions === "quarter" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 4);
                } else if ( repaymentOptions === "biannual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 2);
                } else if ( repaymentOptions === "annual" ) {
                    monthlyAmount = totalAmount / (parsedLoanTermMonths * 1);
                }
    
            // if (parsedLoanTerm === 1) {
            //     setLoanTermType(parsedLoanTerm + ' Month');
            // } else {
            //     setLoanTermType(parsedLoanTerm + ' Months');
            // }
        }
        setLoanIntRate(gtcoInterestRate);
      } else {
        setError('Invalid Loan Type.');
        return;
      }
    break;

    // Case 3: Calculate interest rate
    case !!repayAmount:
      if (dateType === "year") {
        interestAmount = (repayAmount - parsedAmount) / (parsedAmount * parsedLoanTerm);
        monthlyAmount = parsedAmount / (parsedLoanTerm * 12);
        if (parsedLoanTerm === 1) {
            setRateTermType(parsedLoanTerm + ' Year');
        } else {
            setRateTermType(parsedLoanTerm + ' Years');
        }
      } else {
        interestAmount = (repayAmount - parsedAmount) / (parsedAmount * parsedLoanTermMonths * 12);
        monthlyAmount = parsedAmount / (parsedLoanTermMonths * 12);
        if (parsedLoanTerm === 1) {
            setRateTermType(parsedLoanTerm + ' Month');
        } else {
            setRateTermType(parsedLoanTerm + ' Months');
        }
      }

      setRateTotal(repayAmount);
      setFindIntRate((interestAmount * 100).toFixed(2));
      setError(null);
      return;

    default:
      setError('Interest Rate or Loan Type is required.');
      return;
  }  
  
    setTotalRepayment(totalAmount.toFixed(2));
    // setTotalInterest(interestAmount.toFixed(2));
    setMonthlyPayment(monthlyAmount.toFixed(2));
    setError(null);

  };

  const toggle = () => {
    setIsToggled(prevToggle => !prevToggle);
  };

  const calculateRate = () => {
    setRateToggled(prevToggle => !prevToggle);
  }


  return (
    <div className="loan-container d-flex flex-row align-items-center justify-content-center">
       <img
            src= {gtco} 
            className="gtco"
            alt="logo"
      />
      <div id="header-container">
        <div className="d-flex align-items-center" id="loan-header">
            <img
            src= {calculator} 
            className="calculator"
            alt="icon"
            />
            <h1>Loan Interest Rate Calculator</h1>
        </div>
        <div className="loan-cona d-md-flex flex-md-row">
            <div className="loan-conb">
                <div className='d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                    <label>Total Loan</label>
                    <span className="loan-span d-flex flex-row">
                        <p>₦</p>
                        <input type="number" className="input-amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
                    </span>
                </div>
                <div className='d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                    <label>Duration</label>
                    <span className="loan-spanb d-flex flex-row">
                        <input type="number" className="input-term" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
                        <select value={dateType} onChange={e => setDateType(e.target.value)}>
                        <option value="year">Year(s)</option>
                        <option value="month">Month(s)</option>
                        </select>
                    </span>
                </div>
                {rateToggled ? (<div className='rate-space'> </div>
                ) : (<div className='d-flex loan-toggle flex-row align-items-center justify-content-between' id='loan-package'>
                    <p>Calculate GT Bank Loan Package</p>
                    <img
                    src= {isToggled ? toggleon : toggleoff} 
                    className={`toggle-image ${isToggled ? 'on' : 'off'}`}
                    id='toggleoff'
                    alt="toggle"
                    onClick={toggle}
                    />
                </div>)}
                {rateToggled ? 
                (<div className='d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                <label>Amount to Repay</label>
                <span className="loan-span d-flex flex-row">
                    <p>₦</p>
                    <input type="number" className="input-amount" value={repayAmount} onChange={e => setRepayAmount(e.target.value)} />
                </span>
                </div>
                ) : ( isToggled ? (
                    <div className="content-on loan-conf">
                        <div className='d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                        <label>Loan Type </label>
                        <select value={loanType} onChange={e => setLoanType(e.target.value)}>
                        <option value="">Select an option</option>
                        <option value="type1">GT Salary Advance</option>
                        <option value="type2">GTBank School Fees Advance</option>
                        <option value="type3">QuickCredit</option>
                        <option value="type4">Max Advance</option>
                        <option value="type5">Max Plus</option>
                        <option value="type6">Computer Advance</option>
                        <option value="type7">GT Mortgage</option>
                        <option value="type8">Premium Advance</option>
                        <option value="type9">Travel Advance</option>
                        <option value="type10">Vehicle Insurance Premium Financing</option>
                        </select>
                        </div>
                    </div>
                ) : (
                    <div className="content-off">
                        <div className='d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                        <label>Interest Rate p.a </label>
                        <span className="loan-spanc d-flex flex-row">
                            <input type="number" className="input-term" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
                            <p>%</p>
                        </span>
                        </div>
                    </div>
                ))}
                <div className='loan-button d-md-flex flex-md-row align-items-md-center justify-content-md-between'>
                    <button className='loan-butta' onClick={calculateRate}>{rateToggled ? "FIND LOAN RATE" : "FIND INTEREST RATE"}</button>
                    <button className='loan-buttb' onClick={calculateLoan}>CALCULATE</button>
                </div>
                {error && <Error message={error} />}
            </div>
            <div className="loan-conc">
                
                    {rateToggled ? (<div className='loan-concc'>
                    <div className='loan-cond dot'>
                        <h3>Loan Term</h3>
                        <p>{rateTermType} </p>
                    </div>
                    <div className='loan-cond dot'>
                        <h3>Total Repayment</h3>
                        <p>₦{rateTotal}</p>
                    </div>
                    <div className='loan-cond'>
                        <h3>Interest Rate</h3>
                        <p>{findIntRate}% </p>
                    </div>
                </div>) :
                    (<div className='loan-concc'>
                    <div className='loan-cond dot mob'>
                        {/* <h3>Monthly Repayment</h3> */}
                        <select value={repaymentOptions} onChange={e => setRepaymentOptions(e.target.value)}>
                        <option value="month">Monthly Repayment</option>
                        <option value="quarter">Quarterly Repayment</option>
                        <option value="biannual">Biannually Repayment</option>
                        <option value="annual">Annually Repayment</option>
                        </select>
                        <p>₦{monthlyPayment}</p>
                    </div>
                    <div className='loan-cond dot'>
                        <h3>Total Repayment</h3>
                        <p>₦{totalRepayment}</p>
                    </div>
                    <div className='loan-cond'>
                        <h3>{isToggled ? "Interest Rate p.a" : "Loan Term"}</h3>
                        <p>{isToggled ? loanIntRate  + '%' : loanTermType} </p>
                    </div>
                </div>)}
                 
            </div>
        </div>
        <div className='bg-line'>
            <div className='line'></div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
