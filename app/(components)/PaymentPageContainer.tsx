'use client';
import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { back_icon, cancel_icon, logo } from '@/public';
import FindContracts from './FindContracts';
import ChooseContract from './ChooseContract';
import PaymentProcess from './PaymentProcess';

const PaymentPageContainer = () => {
  const [step, setStep] = useState<number>(1);
  const [amountError, setAmountError] = useState<boolean>(true);
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
            <FindContracts />
            <button onClick={nextStep} className={styles.next_button_first}>
              Növbəti
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <ChooseContract />
            <div className={styles.button_flex}>
              <button onClick={prevStep} className={styles.back_button}>
                {back_icon}Geri
              </button>
              <button onClick={nextStep} className={styles.next_button}>
                Növbəti
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <PaymentProcess
              errorMessage={amountError}
              setErrorMessage={setAmountError}
            />
            <div className={styles.button_flex}>
              <button onClick={prevStep} className={styles.back_button}>
                {back_icon}Geri
              </button>
              <button
                onClick={() => alert('Form Submitted')}
                className={styles.next_button}
              >
                Növbəti
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPageContainer;
