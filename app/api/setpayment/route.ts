import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import dayjs from 'dayjs';

axiosCurlirize(axios);

export async function GET(req: any, res: any) {
    return NextResponse.redirect(
      `https://payment.ferrumcapital.az/payment?res_rtm=approve`
    );
}

export async function POST(req: any, res: any) {
  const url = process.env.PROD_SET_PAYMENT_API_URL || '';

  const metadata = await req.json();
  console.log('indi' + Date.now());
  console.log(JSON.stringify(metadata));
  console.log('Muqavile nomresi: ' + metadata.payload.description);
  const { searchParams } = new URL(req.url);
  const pincode = searchParams.get('pincode');
  const docNum = searchParams.get('docnum');

  const payload = {
    // docItemNumber: docNum, //istifade olunmayacaq artiq
    // pinCode: pincode, //istifade olunmayacaq artiq
    docItemNumber: metadata.payload.description, 
    // pinCode: metadata.payload.customMessage,
    pinCode: "0",
    transactId: metadata.payload.orderId,
    paymentDate: dayjs(Date.now()).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    amount: metadata.payload.amount,
  };

  try {
    console.log(JSON.stringify(metadata.payload));
    await axios.post(url, payload, {
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
    });

    // return NextResponse.json(response.data);
    return NextResponse.json(payload);
    // return NextResponse.redirect(
    //   `https://payment.ferrumcapital.az/payment?res_rtm=approve`
    // );
  } catch (error) {
    console.log(Date.now());
    console.log(JSON.stringify(metadata.payload));
    return NextResponse.json(
      //@ts-ignore
      error.response?.data,
      { status: 500 }
    );
  }
}
