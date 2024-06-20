import { Modal } from 'antd';
import React from 'react';
import styles from '../styles/StatusModal.module.scss';
import { error_icon, success_icon } from '@/public';

interface StatusModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}

const StatusModal = ({ open, setOpen, status }: StatusModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      closable={false}
      centered
      width="fit-content"
    >
      {' '}
      <div className={styles.modal_container}>
        <div className={styles.icon}>
          {status === 'success' ? success_icon : error_icon}
        </div>
        <div className={styles.title}>
          {status === 'success'
            ? 'Ödəniş uğurla həyata keçirildi'
            : 'Xəta baş verdi'}
        </div>
        <div className={styles.description}>
          {status === 'success' ? 'success' : 'error'}
        </div>
        <button onClick={() => setOpen(false)}>Əsas səhifəyə dön</button>
      </div>
    </Modal>
  );
};

export default StatusModal;
