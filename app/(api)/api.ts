import { axiosTemplate } from '.';

export const postContractDetails = async (data: any) => {
  try {
    return axiosTemplate({
      url: 'customers/contracts/all',
      method: 'post',
      maxBodyLength: Infinity,
      headers: {
        'v-id': 1234,
      },
      data: data,
    });
  } catch (err: any) {
    console.log(err);
  }
};
