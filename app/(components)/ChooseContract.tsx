'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { back_icon } from '@/public';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContract } from '../(store)/(slices)/selectedContractSlice';
import { Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { getContracts } from '../(api)/api';
import { setContractsData } from '../(store)/(slices)/contractsSlice';

interface Props {
  next: () => void;
  prev: () => void;
}

const ChooseContract = ({ next, prev }: Props) => {
  const searchParams = useSearchParams();
  const status: any = searchParams?.get('res_rtm');
  const docNum: any = searchParams?.get('docnum');
  const pinCode: any = searchParams?.get('pincode');
  const birthdate: any = searchParams?.get('birthdate');
  const dispatch = useDispatch();
  const contracts = useSelector(
    (store: { contracts: any }) => store.contracts?.data?.data
  );
  const [selected, setSelected] = useState<any>();

  const getDetails = async (query: any) => {
    // setLoading(true);
    try {
      const response: any = await getContracts(query);
      // setLoading(true);
      if (response?.data !== undefined && response?.status === 200) {
        // setLoading(false);
        dispatch(setContractsData(response?.data));
        console.log(response?.data);
        const defaultContract = response?.data?.data?.contracts?.find(
          (item: any) => item?.documentNumber === docNum
        );
        console.log(defaultContract);
        if (defaultContract) {
          setSelected(defaultContract);
          dispatch(
            setSelectedContract({
              currentDebtAmount: defaultContract?.currentDebtAmount,
              documentNumber: defaultContract?.documentNumber,
              totalDebtAmount: defaultContract?.totalDebtAmount,
            })
          );
        }
      }
    } catch (error: any) {
      // setLoading(false);
      alert('Finkod tapılmadı');
      console.log(error);
    }
  };

  const handleContractClick = (item: any) => {
    setSelected(item);
    dispatch(
      setSelectedContract({
        currentDebtAmount: item?.currentDebtAmount,
        documentNumber: item?.documentNumber,
        totalDebtAmount: item?.totalDebtAmount,
      })
    );
  };
  console.log(selected);
  console.log(docNum);
  useEffect(() => {
    if (status === 'canceled') {
      const query = {
        pinCode: pinCode,
        dateOfBirth: birthdate,
      };
      getDetails(JSON.stringify(query));
    }
  }, []);

  return (
    <div className={styles.choose_contract_container}>
      {contracts?.contracts?.documentNumber !== '' && (
        <div className={styles.name}>{contracts?.fullName}</div>
      )}
      <div className={styles.active_contracts_header}>Aktiv müqavilələr</div>
      <div className={styles.contracts_container}>
        {contracts?.contracts?.documentNumber === '' ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              height: '100px',
              overflowY: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin />
          </div>
        ) : (
          contracts?.contracts?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className={
                  selected === item
                    ? `${styles.selected_contract}`
                    : `${styles.contract}`
                }
                onClick={() => handleContractClick(item)}
              >
                {item?.documentNumber}
              </div>
            );
          })
        )}
      </div>
      <div className={styles.button_flex}>
        <button onClick={prev} className={styles.back_button}>
          {back_icon}Geri
        </button>
        <button
          disabled={selected === undefined}
          onClick={() => next()}
          className={styles.next_button}
        >
          Növbəti
        </button>
      </div>
    </div>
  );
};

export default ChooseContract;
