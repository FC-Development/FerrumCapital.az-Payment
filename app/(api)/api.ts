import axios from 'axios';

export const getContracts = async (query: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/getdata',
      data: query,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCurrentDateExpireTime = () => {
  const now = new Date();
  now.setHours(23, 59, 0, 0);
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - timezoneOffset);
  return localTime.toISOString().slice(0, -5) + 'Z';
};

export const postAmount = async (query: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.payriff.com/api/v2/invoices',
      headers: {
        Authorization: '6A5CF099D8CB46F793FC8803811FA3CD',
        'Content-Type': 'application/json',
      },
      data: {
        body: {
          amount: query.amount,
          approveURL: `https://payment.ferrumcapital.az/payment?res_rtm=approve`,
          cancelURL: `https://payment.ferrumcapital.az/payment?res_rtm=canceled`,
          currencyType: 'AZN',
          customMessage: query.pinCode, //musteri finkodu burdan cekilecek
          declineURL: 'https://payment.ferrumcapital.az/payment?res_rtm=decline',
          // description: query.description,
          description: query.docNumber, //muqavile uzre asm gonderilecek
          email: 'finance4@ferrumcapital.az',
          expireDate: getCurrentDateExpireTime(),
          fullName: query.fullname,
          installmentPeriod: 0,
          installmentProductType: 'BIRKART',
          languageType: 'AZ',
          phoneNumber: "+994500000000",
          sendSms: false,
          amountDynamic: false,
          directPay: true,
        },
        merchant: 'ES1092847',
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postPaymentDetail = async (query: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://172.16.30.26:8283/v1/api/payments/detail',
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
      data: query,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
