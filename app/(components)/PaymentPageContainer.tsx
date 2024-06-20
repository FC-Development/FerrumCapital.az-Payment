'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { cancel_icon, logo } from '@/public';
import FindContracts from './FindContracts';
import ChooseContract from './ChooseContract';
import PaymentProcess from './PaymentProcess';

const PaymentPageContainer = () => {
  // Initialize state based on local storage
  const stepIndex =
    typeof window !== 'undefined' ? window.localStorage.getItem('step') : null;
  const [step, setStep] = useState<number>(stepIndex ? Number(stepIndex) : 1);

  // Update local storage whenever the step changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step', step.toString());
    }
  }, [step]);

  // Increment the step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Decrement the step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.logo_section}>{logo}</div>
      <div className={styles.form_section}>
        <div className={styles.cancel}>{cancel_icon}</div>
        <div className={styles.form_heading}>Müqavilə ödənişi</div>
        {step === 1 && (
          <div>
            <FindContracts next={nextStep} />
          </div>
        )}
        {step === 2 && (
          <div>
            <ChooseContract next={nextStep} prev={prevStep} />
          </div>
        )}
        {step === 3 && (
          <div>
            <PaymentProcess next={nextStep} prev={prevStep} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPageContainer;
