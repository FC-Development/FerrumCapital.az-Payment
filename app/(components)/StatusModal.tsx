'use client';
import { Modal } from 'antd';
import React from 'react';
import styles from '../styles/StatusModal.module.scss';
import { error_icon, success_icon } from '@/public';
import { useRouter, useSearchParams } from 'next/navigation';

interface StatusModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}

const StatusModal = ({ open, setOpen, status }: StatusModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docNumber: any = searchParams?.get('docnum');
  const amount: any = searchParams?.get('amount');
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
          {status === 'success' ? 'Ödənildi' : 'Xəta baş verdi'}
        </div>
        <div className={styles.description}>
          {status === 'success'
            ? `${docNumber} nömrəli müqaviləyə ${amount} AZN məbləğində ödəniş uğurla həyata keçmişdir`
            : 'Zəhmət olmasa yenidən cəhd edin'}
        </div>
        <button
          onClick={() => {
            setOpen(false);
            router.push('/payment');
            // localStorage?.setItem('step', '1');
          }}
        >
          Əsas səhifəyə dön
        </button>
      </div>
    </Modal>
  );
};

export default StatusModal;
