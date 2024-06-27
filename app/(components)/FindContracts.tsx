import React, { useEffect, useState } from 'react';
import styles from '../styles/PaymentPageContainer.module.scss';
import { DatePicker, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ID_old from '../../public/vəsiqə foto.png';
import ID_new from '../../public/Frame 48097282.png';
import { useDispatch } from 'react-redux';
import { setField } from '../(store)/(slices)/searchContractsSlice';
import dayjs from 'dayjs';
import { getContracts } from '../(api)/api';
import { setContractsData } from '../(store)/(slices)/contractsSlice';
import { Puff, ThreeDots } from 'react-loader-spinner';

interface Props {
  next: () => void;
}

const FindContracts = ({ next }: Props) => {
  const birthdateValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('birthdate')
      : null;
  const finCodeValue =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('finCode')
      : false;
  const [fincodeError, setFincodeError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [fields, setFields] = useState<any>({
    birthdate: '',
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

  const getDetails = async (query: any) => {
    setLoading(true);
    try {
      const response: any = await getContracts(query);
      setLoading(true);
      if (response?.data !== undefined && response?.status === 200) {
        setLoading(false);
        dispatch(setContractsData(response?.data));
        dispatch(setField({ key: 'fields', value: fields }));
        localStorage.setItem(
          'birthdate',
          dayjs(fields?.birthdate, 'DD.MM.YYYY').format('DD.MM.YYYY')
        );
        localStorage?.setItem('finCode', fields?.finCode);
        next();
      }
    } catch (error: any) {
      setLoading(false);
      alert('Finkod tapılmadı');
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    if (
      fields?.finCode?.length === 7 &&
      fields?.birthdate !== null &&
      fields?.birthdate !== ''
    ) {
      // const query = {
      //   pinCode: fields?.finCode,
      //   dateOfBirth: dayjs(fields?.birthdate).format('YYYY-MM-DD'),
      // };
      const query = {
        pinCode: fields?.finCode,
        dateOfBirth: dayjs(fields?.birthdate, 'DD.MM.YYYY').format(
          'YYYY-MM-DD'
        ),
      };
      getDetails(JSON.stringify(query));
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
          defaultValue={
            typeof dayjs(birthdateValue, 'DD.MM.YYYY') === 'string'
              ? dayjs(birthdateValue, 'DD.MM.YYYY')
              : ''
          }
          format={'DD.MM.YYYY'}
          placeholder="Seçin"
          suffixIcon={false}
          onChange={(value: any, dateString: any) => {
            setDateError(false);
            setFields({
              ...fields,
              birthdate: dayjs(dateString, 'DD.MM.YYYY'),
            });
          }}
        />
        {dateError && (
          <div className={styles.error_msg}>Doğum tarixi seçin</div>
        )}
        <div className={styles.label} style={{ marginTop: '24px' }}>
          FİN kod
        </div>
        <Input
          defaultValue={finCodeValue || ''}
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
          {loading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ThreeDots
                visible={true}
                height="30"
                width="60"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div>Növbəti</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default FindContracts;
