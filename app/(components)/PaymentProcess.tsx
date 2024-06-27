import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { Input } from 'antd';
import { back_icon } from '@/public';
import { useSelector } from 'react-redux';
import { postAmount } from '../(api)/api';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

interface Props {
  next: () => void;
  prev: () => void;
}

const PaymentProcess = ({ next, prev }: Props) => {
  const router = useRouter();
  const birthdateValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('birthdate')
      : null;
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<any>(false);

  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const query = {
        amount: amount,
        fullname: contracts?.data?.fullName,
        description:
          contract?.documentNumber +
          ' - ' +
          contracts?.data?.pinCode +
          ' - ' +
          contracts?.data?.fullName,
        docNumber: contract?.documentNumber,
        pinCode: contracts?.data?.pinCode,
        birthdate: birthdateValue,
      };
      const response = await postAmount(query);
      console.log(response.payload?.approveURL);
      setLoading(false);
      router?.push(response?.payload?.paymentUrl);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
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
          disabled={amountError || Number(amount) === 0}
          onClick={() => handleSubmit()}
          className={styles.next_button}
        >
          {loading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ThreeDots
                visible={true}
                height="30"
                width="60"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div>Növbəti</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentProcess;
