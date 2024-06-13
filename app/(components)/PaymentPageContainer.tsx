'use client';
import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { back_icon, cancel_icon, logo } from '@/public';
import FindContracts from './FindContracts';
import ChooseContract from './ChooseContract';
import PaymentProcess from './PaymentProcess';

const PaymentPageContainer = () => {
  const [step, setStep] = useState<number>(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

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
