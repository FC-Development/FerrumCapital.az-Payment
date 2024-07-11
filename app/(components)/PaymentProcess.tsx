import React, { useEffect, useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { Input } from 'antd';
import { back_icon } from '@/public';
import { useDispatch, useSelector } from 'react-redux';
import { getContracts, postAmount, postPaymentDetail } from '../(api)/api';
import { Puff, ThreeDots } from 'react-loader-spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { setContractsData } from '../(store)/(slices)/contractsSlice';
import StatusModal from './StatusModal';
import dayjs from 'dayjs';

interface Props {
  next: () => void;
  prev: () => void;
}

const PaymentProcess = ({ prev }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const status: any = searchParams?.get('res_rtm');
  const docNum: any = searchParams?.get('docnum');
  const pinCode: any = searchParams?.get('pincode');
  const birthdate: any = searchParams?.get('birthdate');
  const paymentAmount: any = searchParams?.get('amount');
  const birthdateValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('birthdate')
      : null;
  const [amount, setAmount] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<any>(false);
  const [defaultContract, setDefaultContract] = useState<any>('');
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
    if (contract?.documentNumber !== '') {
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
    } else {
      if (
        numericValue < defaultContract.currentDebtAmount ||
        numericValue > defaultContract.totalDebtAmount
      ) {
        setAmountError(
          ` ${contract.currentDebtAmount} AZN və ${contract.totalDebtAmount} AZN arasında məbləğ daxil edin`
        );
      } else {
        setAmountError(null);
        setAmount(value);
      }
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
          contract?.documentNumber + ' - ' + contracts?.data?.pinCode,
        docNumber: contract?.documentNumber,
        pinCode: contracts?.data?.pinCode,
        birthdate: birthdateValue,
      };
      const response = await postAmount(query);
      setLoading(false);
      router?.push(response?.payload?.paymentUrl);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };
  const getDetails = async (query: any) => {
    setLoading(true);
    try {
      const response: any = await getContracts(query);
      setLoading(true);
      if (response?.data !== undefined && response?.status === 200) {
        setLoading(false);
        dispatch(setContractsData(response?.data));
        const defaultContract = response?.data?.data?.contracts?.find(
          (item: any) => item?.documentNumber === docNum
        );
        setDefaultContract(defaultContract);
      }
    } catch (error: any) {
      setLoading(false);
      alert('Finkod tapılmadı');
      console.log(error);
    }
  };
  console.log(status);
  useEffect(() => {
    if (status === 'canceled') {
      setLoading(true);
      setAmount(paymentAmount);
      const query = {
        pinCode: pinCode,
        dateOfBirth: birthdate,
      };
      getDetails(JSON.stringify(query));
    }
  }, []);
  return loading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        paddingRight: '150px',
      }}
    >
      {' '}
      <Puff
        height="120"
        width="120"
        radius={1}
        color="#EAEBF2"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <div className={styles.choose_contract_container}>
      <div className={styles.name}>{contracts?.data?.fullName}</div>
      <div className={styles.inputs_container}>
        <div>
          <div className={styles.label}>Müqavilə nömrəsi</div>
          <div className={styles.disabled_input}>
            {defaultContract
              ? defaultContract?.documentNumber
              : contract?.documentNumber}
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
            {defaultContract
              ? defaultContract?.totalDebtAmount
              : contract?.totalDebtAmount}
          </div>
        </div>
        <div>
          <div className={styles.label}>Məbləğ *</div>
          <Input
            defaultValue={
              paymentAmount ? paymentAmount : contract?.currentDebtAmount
            }
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
      <StatusModal open={openModal} setOpen={setOpenModal} status="success" />
    </div>
  );
};

export default PaymentProcess;
