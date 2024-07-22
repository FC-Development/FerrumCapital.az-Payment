import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

axiosCurlirize(axios);

export async function GET(req: any, res: any) {
    return NextResponse.redirect(`https://payment.ferrumcapital.az/payment?res_rtm=approve`);
}

export async function POST(req: any, res: any) {
  const url = process.env.PROD_SET_PAYMENT_API_URL || '';

  const metadata = await req.json();
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(metadata)}\n`;
  
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
    paymentDate: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    amount: metadata.payload.amount,
  };

  try {
    await axios.post(url, payload, {
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
    });
    //@ts-ignore
    return NextResponse.json(
      //@ts-ignore
      { fc_service_nr: "ok" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      //@ts-ignore
      error.response?.data,
      { status: 500 }
    );
  }
}
