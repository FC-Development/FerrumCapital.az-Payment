import React from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { DatePicker, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ID_old from '../../public/vəsiqə foto.png';
import ID_new from '../../public/Frame 48097282.png';

const FindContracts = () => {
  const tooltipContent = (
    <div style={{ padding: '12px' }}>
      <div className={styles.tooltip_info_text}>
        <InfoCircleOutlined style={{ marginRight: '11.3px' }} />
        FİN nədir?
      </div>
      <Image
        style={{ marginBottom: '16px' }}
        src={ID_old}
        alt="vesiqe"
        width={202}
        height={136}
      />
      <Image src={ID_new} alt="example" width={202} height={136} />
    </div>
  );

  return (
    <div className={styles.find_contracts_container}>
      <div className={styles.label}>Doğum tarixi</div>
      <DatePicker
        format={'DD.MM.YYYY'}
        placeholder="Seçin"
        suffixIcon={false}
        onChange={() => console.log('first')}
        style={{ marginBottom: '24px' }}
      />
      <div className={styles.label}>FİN kod</div>
      <Input
        placeholder="Finkod daxil edin"
        width={456}
        style={{ border: 'none', background: '#F7F7FB' }}
        suffix={
          <Tooltip title={tooltipContent}>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
    </div>
  );
};

export default FindContracts;
