import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { back_icon } from '@/public';

interface Props {
  next: () => void;
  prev: () => void;
}

const ChooseContract = ({ next, prev }: Props) => {
  const [selected, setSelected] = useState<any[]>([]);
  const data = [
    { id: 0, name: '1235667' },
    { id: 1, name: '1235667' },
    { id: 2, name: '1235667' },
  ];

  console.log(selected);
  const handleContractClick = (id: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((contractId) => contractId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  return (
    <div className={styles.choose_contract_container}>
      <div className={styles.name}>Əliyev Elnur Vəli</div>
      <div className={styles.active_contracts_header}>Aktiv müqavilələr</div>
      <div className={styles.contracts_container}>
        {data?.map((item: any) => {
          return (
            <div
              key={item?.id}
              className={
                selected?.includes(item?.id)
                  ? `${styles.selected_contract}`
                  : `${styles.contract}`
              }
              onClick={() => handleContractClick(item?.id)}
            >
              {item?.name}
            </div>
          );
        })}
      </div>
      <div className={styles.button_flex}>
        <button onClick={prev} className={styles.back_button}>
          {back_icon}Geri
        </button>
        <button
          disabled={selected?.length === 0}
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
