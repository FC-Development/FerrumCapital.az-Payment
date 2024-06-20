import React, { useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { DatePicker, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ID_old from '../../public/vəsiqə foto.png';
import ID_new from '../../public/Frame 48097282.png';
import { useDispatch } from 'react-redux';
import { setField } from '../(store)/(slices)/searchContractsSlice';
import dayjs from 'dayjs';
import { postContractDetails } from '../(api)/api';

interface Props {
  next: () => void;
}

const FindContracts = ({ next }: Props) => {
  const birthdateValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('birthdate')
      : false;
  const finCodeValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('finCode')
      : false;
  const [fincodeError, setFincodeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [fields, setFields] = useState<any>({
    birthdate: birthdateValue ? dayjs(birthdateValue, 'DD.MM.YYYY') : null,
    finCode: finCodeValue || '',
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

  const postDetails = (query: any) => {
    try {
      const response = postContractDetails(query);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    console.log(fields?.birthdate);
    if (
      fields?.finCode?.length === 7 &&
      fields?.birthdate !== null &&
      fields?.birthdate !== ''
    ) {
      const query = {
        pinCode: fields?.finCode,
        dateOfBirth: fields?.birthdate,
      };
      postDetails(query);
      next();
      dispatch(setField({ key: 'fields', value: fields }));
      localStorage.setItem(
        'birthdate',
        dayjs(fields?.birthdate).format('DD.MM.YYYY')
      );
      localStorage?.setItem('finCode', fields?.finCode);
    } else if (fields?.finCode?.length !== 7) {
      setFincodeError(true);
    } else if (fields?.birthdate === null || fields?.birthdate === '') {
      setDateError(true);
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
          disabled={fincodeError || dateError}
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
