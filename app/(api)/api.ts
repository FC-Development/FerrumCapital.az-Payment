import axios from 'axios';

export const getContracts = async (query: any) => {
  console.log(query);
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/getdata',
      data: query,
    });
    return response; // Correctly returning the response data
  } catch (error) {
    console.log(error);
    throw error; // Propagate the error to the caller
  }
};
