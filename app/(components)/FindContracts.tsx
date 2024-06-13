import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { DatePicker, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ID_old from '../../public/vəsiqə foto.png';
import ID_new from '../../public/Frame 48097282.png';
import { useDispatch } from 'react-redux';
import { setField } from '../(store)/(slices)/searchContractsSlice';

interface Props {
  next: () => void;
}

const FindContracts = ({ next }: Props) => {
  const [fincodeError, setFincodeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [fields, setFields] = useState<any>({
    birthdate: null,
    finCode: '',
  });
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

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    if (fields?.finCode?.length !== 7) {
      setFincodeError(true);
    }
    if (fields?.birthdate === null) {
      setDateError(true);
    } else {
      next();
      dispatch(setField({ key: 'fields', value: fields }));
    }
  };

  return (
    <div className={styles.find_contracts_container}>
      <div className={styles.label}>Doğum tarixi</div>
      <form id="find-contracts">
        <DatePicker
          defaultValue={fields?.birthdate}
          format={'DD.MM.YYYY'}
          placeholder="Seçin"
          suffixIcon={false}
          onChange={(value: any, dateString: any) => {
            setDateError(false);
            setFields({ ...fields, birthdate: dateString });
          }}
        />
        {dateError && (
          <div className={styles.error_msg}>Doğum tarixi seçin</div>
        )}
        <div className={styles.label} style={{ marginTop: '24px' }}>
          FİN kod
        </div>
        <Input
          defaultValue={fields?.finCode}
          placeholder="Finkod daxil edin"
          width={456}
          max={7}
          min={7}
          onChange={(e) => {
            setFincodeError(false);
            setFields({ ...fields, finCode: e?.target?.value });
          }}
          style={{ border: 'none', background: '#F7F7FB' }}
          suffix={
            <Tooltip title={tooltipContent}>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        {fincodeError && (
          <div className={styles.error_msg}>
            Finkod 7 simvoldan ibarət olmalıdır
          </div>
        )}
        <button
          type="submit"
          form="find-contracts"
          onClick={handleSubmit}
          className={styles.next_button_first}
        >
          Növbəti
        </button>
      </form>
    </div>
  );
};

export default FindContracts;
