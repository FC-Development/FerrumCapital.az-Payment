import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { Input } from 'antd';
import { back_icon } from '@/public';
import StatusModal from './StatusModal';

interface Props {
  next: () => void;
  prev: () => void;
}
//localStorage.removeItem(key);
const PaymentProcess = ({ next, prev }: Props) => {
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.choose_contract_container}>
      <div className={styles.name}>Əliyev Elnur Vəli</div>
      <div className={styles.inputs_container}>
        <div>
          <div className={styles.label}>Müqavilə nömrəsi</div>
          <div className={styles.disabled_input}>PVN123456</div>
        </div>
        <div>
          <div className={styles.label}>FİN kod</div>
          <div className={styles.disabled_input}>2QF6MRS</div>
        </div>
        <div>
          <div className={styles.label}>Ümumi borc</div>
          <div className={styles.disabled_input}>1400 AZN</div>
        </div>
        <div>
          <div className={styles.label}>Ödəniləcək məbləğ *</div>
          <Input
            style={{
              width: '220px',
              border: amountError ? '1px solid #D03838' : 'none',
              background: amountError ? '#FFF0F0' : '#F7F7FB',
            }}
            type="number"
            onChange={(e) => {
              setAmountError(false);
              setAmount(e?.target?.value);
            }}
            placeholder="0 AZN"
          />
          {amountError && (
            <div className={styles.error_msg}>
              1 AZN - 5000 AZN məbləğ daxil edin{' '}
            </div>
          )}
        </div>
      </div>
      <div className={styles.button_flex}>
        <button onClick={prev} className={styles.back_button}>
          {back_icon}Geri
        </button>
        <button
          disabled={amount === ''}
          onClick={() => alert('Form Submitted')}
          className={styles.next_button}
        >
          Növbəti
        </button>
      </div>
      <StatusModal open={openModal} setOpen={setOpenModal} status="success" />
    </div>
  );
};

export default PaymentProcess;
