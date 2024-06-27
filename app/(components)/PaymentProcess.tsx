import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { Input } from 'antd';
import { back_icon } from '@/public';
import StatusModal from './StatusModal';
import { useSelector } from 'react-redux';

interface Props {
  next: () => void;
  prev: () => void;
}

const PaymentProcess = ({ next, prev }: Props) => {
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<any>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const contracts = useSelector(
    (store: { contracts: any }) => store.contracts?.data
  );
  const contract = useSelector(
    (store: { selectedContract: any }) => store.selectedContract?.contract
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (
      numericValue < contract.currentDebtAmount ||
      numericValue > contract.totalDebtAmount
    ) {
      setAmountError(
        ` ${contract.currentDebtAmount} AZN və ${contract.totalDebtAmount} AZN arasında məbləğ daxil edin`
      );
    } else {
      setAmountError(null);
      setAmount(value);
    }
  };

  return (
    <div className={styles.choose_contract_container}>
      <div className={styles.name}>{contracts?.data?.fullName}</div>
      <div className={styles.inputs_container}>
        <div>
          <div className={styles.label}>Müqavilə nömrəsi</div>
          <div className={styles.disabled_input}>
            {contract?.documentNumber}
          </div>
        </div>
        <div>
          <div className={styles.label}>FİN kod</div>
          <div className={styles.disabled_input}>
            {contracts?.data?.pinCode}
          </div>
        </div>
        <div>
          <div className={styles.label}>Ümumi borc</div>
          <div className={styles.disabled_input}>
            {contract?.totalDebtAmount}
          </div>
        </div>
        <div>
          <div className={styles.label}>Ödəniləcək məbləğ *</div>
          <Input
            defaultValue={contract?.currentDebtAmount}
            style={{
              width: '220px',
              border: amountError ? '1px solid #D03838' : 'none',
              background: amountError ? '#FFF0F0' : '#F7F7FB',
            }}
            type="number"
            onChange={handleInputChange}
            placeholder="0 AZN"
            min={contract?.currentDebtAmount}
            max={contract?.totalDebtAmount}
          />
          {amountError && <div className={styles.error_msg}>{amountError}</div>}
        </div>
      </div>
      <div className={styles.button_flex}>
        <button onClick={prev} className={styles.back_button}>
          {back_icon}Geri
        </button>
        <button
          disabled={amountError}
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
