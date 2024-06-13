import React from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { Input } from 'antd';

interface Props {
  errorMessage: boolean;
  setErrorMessage: (open: boolean) => void;
}

const PaymentProcess = ({ errorMessage, setErrorMessage }: Props) => {
  console.log(errorMessage);
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
              border: errorMessage ? '1px solid #D03838' : 'none',
              background: errorMessage ? '#FFF0F0' : '#F7F7FB',
            }}
            onChange={() => setErrorMessage(false)}
            placeholder="0 AZN"
          />
          {errorMessage && (
            <div className={styles.error_msg}>
              1 AZN - 5000 AZN məbləğ daxil edin{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
