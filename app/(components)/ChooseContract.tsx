'use client';
import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { back_icon } from '@/public';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContract } from '../(store)/(slices)/selectedContractSlice';
import { Spin } from 'antd';

interface Props {
  next: () => void;
  prev: () => void;
}

const ChooseContract = ({ next, prev }: Props) => {
  const dispatch = useDispatch();
  const contracts = useSelector(
    (store: { contracts: any }) => store.contracts?.data?.data
  );
  const [selected, setSelected] = useState<any>();

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
