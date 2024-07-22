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
  const { searchParams } = new URL(req.url);
  const pincode = searchParams.get('pincode');
  const docNum = searchParams.get('docnum');

  const payload = {
    docItemNumber: metadata.payload.description,
    pinCode: "0",
    transactId: metadata.payload.orderId,
    paymentDate: dayjs(Date.now()).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    amount: metadata.payload.amount,
  };

  try {
    await axios.post(url, payload, {
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
    });
    console.log("\n ↓↓↓↓↓↓ Ferrum servis (set payment) sorğusu uğurlu ↓↓↓↓↓↓ \n");
    console.log('Payriff post data:\n' + JSON.stringify(metadata.payload));
    console.log('\nOur data:\n' + JSON.stringify(payload));
    console.log("\n ↑↑↑↑↑↑ Ferrum servis (set payment) sorğusu uğurlu ↑↑↑↑↑↑ \n");
    //@ts-ignore
    return NextResponse.json(response?.data);
  } catch (error) {
    console.log("\n ↓↓↓↓↓↓ Ferrum servis (set payment) sorğusu xətalı ↓↓↓↓↓↓ \n");
    console.log('Payriff post data:\n' + JSON.stringify(metadata.payload));
    console.log('\nOur data:\n' + JSON.stringify(payload));
    console.log("\n ↑↑↑↑↑↑ Ferrum servis (set payment) sorğusu xətalı ↑↑↑↑↑↑ \n");

    console.log("\n ↓↓↓↓↓↓ API level xəta ↓↓↓↓↓↓ \n");
    //@ts-ignore
    console.log(JSON.stringify(response?.data));
    console.log("\n ↑↑↑↑↑↑ API level xəta ↑↑↑↑↑↑ \n");

    return NextResponse.json(
      //@ts-ignore
      error.response?.data,
      { status: 500 }
    );
  }
}
