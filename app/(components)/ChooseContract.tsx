import React from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';

const ChooseContract = () => {
  const data = [
    {
      name: '1235667',
    },
    {
      name: '1235667',
    },
    {
      name: '1235667',
    },
  ];
  return (
    <div className={styles.choose_contract_container}>
      <div className={styles.name}>Əliyev Elnur Vəli</div>
      <div className={styles.active_contracts_header}>Aktiv müqavilələr</div>
      <div className={styles.contracts_container}>
        {data?.map((item: any, index: number) => {
          return (
            <div key={index} className={styles.contract}>
              {item?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseContract;
