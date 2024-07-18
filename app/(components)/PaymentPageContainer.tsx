'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { cancel_icon, logo } from '@/public';
import FindContracts from './FindContracts';
import ChooseContract from './ChooseContract';
import PaymentProcess from './PaymentProcess';
import { useSearchParams } from 'next/navigation';
import StatusModal from './StatusModal';

const PaymentPageContainer = () => {
  const searchParams = useSearchParams();
  const status: any = searchParams?.get('res_rtm');
  const docNum: any = searchParams?.get('docnum');
  const pinCode: any = searchParams?.get('pincode');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const paymentAmount: any = searchParams?.get('amount');
  const stepIndex =
    typeof window !== 'undefined' ? window.localStorage.getItem('step') : null;
  const [step, setStep] = useState<number>(
    status === 'canceled' ? 3 : stepIndex ? Number(stepIndex) : 1
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step', step.toString());
    }
  }, [step]);

  const nextStep = () => {
    //setStep((prevStep) => prevStep + 1);
  };

  // Decrement the step
  const prevStep = () => {
    //setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    localStorage?.removeItem('birthdate');
    localStorage?.removeItem('finCode');
    localStorage?.setItem('step', '1');
    if (status === 'approve') {
      console.log('fff');
    }
  }, []);

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
      <StatusModal
        open={status === 'approve' || status == 'declined'}
        setOpen={setOpenModal}
        status={status === 'approve' ? 'success' : 'error'}
      />
    </div>
  );
};

export default PaymentPageContainer;
