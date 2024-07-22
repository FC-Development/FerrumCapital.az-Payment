import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

axiosCurlirize(axios);

export async function GET(req: any, res: any) {
    return NextResponse.redirect(
      `https://payment.ferrumcapital.az/payment?res_rtm=approve`
    );
}

export async function POST(req: any, res: any) {
  const url = process.env.PROD_SET_PAYMENT_API_URL || '';

  const metadata = await req.json();
  if(metadata.payload) {
    console.log("EXIST")
    //burdan loglama getmelidi breakpoint esasinda
  }
  else {
    console.log("NOT EXIST!!!")
  }
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(metadata)}\n`;
  console.log(process.cwd());
  
  const logFilePath = path.join(process.cwd(), 'logs', 'server.log');
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
    else {
      console.log('yazildi')
    }
  });
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

    //rs append

    console.log("\n ↓↓↓↓↓↓ Ferrum servis (set payment) sorğusu xətalı ↓↓↓↓↓↓ \n");
    console.log('Payriff post data:\n' + JSON.stringify(metadata.payload));
    console.log('\nOur data:\n' + JSON.stringify(payload));
    console.log("\n ↑↑↑↑↑↑ Ferrum servis (set payment) sorğusu xətalı ↑↑↑↑↑↑ \n");

    console.log("\n ↓↓↓↓↓↓ API level xəta ↓↓↓↓↓↓ \n");
    //@ts-ignore
    console.log(JSON.stringify(error.response));
    console.log("\n ↑↑↑↑↑↑ API level xəta ↑↑↑↑↑↑ \n");

    return NextResponse.json(
      //@ts-ignore
      error.response?.data,
      { status: 500 }
    );
  }
}
