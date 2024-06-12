import React from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { cancel_icon, logo } from '@/public';

const page = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.logo_section}>{logo}</div>
      <div className={styles.form_section}>
        <div className={styles.cancel}>{cancel_icon}</div>
        <div className={styles.form_heading}>Müqavilə ödənişi</div>
      </div>
    </div>
  );
};

export default page;
