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

  const logFilePath = path.join(process.cwd(), 'logs', 'server.log');
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }

  const logEntry_1 = `${new Date().toISOString()} - Payriff payload: - ${JSON.stringify(metadata)}\n`;
  fs.appendFile(logFilePath, logEntry_1, err => err ? console.error('Payriff log xəta:', err) : console.log('Payriff log yazıldı'));

  try {
    const payload = {
      docItemNumber: metadata.payload.description,
      pinCode: "0",
      transactId: metadata.payload.orderId,
      paymentDate: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      amount: metadata.payload.amount,
    };
    const logEntry_2 = `${new Date().toISOString()} - Our payload: - ${JSON.stringify(payload)}\n`;
    fs.appendFile(logFilePath, logEntry_2, err => err ? console.error('Our log xəta:', err) : console.log('Our log yazıldı'));

    const service_response = await axios.post(url, payload, {
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
    });
    const logEntry_3 = `${new Date().toISOString()} - NR res payload: - ${JSON.stringify(service_response.data)}\n\n`;
    fs.appendFile(logFilePath, logEntry_3, err => err ? console.error('NR res log xəta:', err) : console.log('NR res log yazıldı'));
    console.log(service_response);
    
    return NextResponse.json(
      //@ts-ignore
      { 
        fc_service_nr: "ok", 
        //@ts-ignore
        fc_service_response: service_response.data
      },
      { status: 200 }
    );
  } catch (error) {
    //@ts-ignore
    const errorData = error.response?.data || error.message || 'Unknown error';
    const logEntry_3 = `${new Date().toISOString()} - NR res error: - ${JSON.stringify(errorData)}\n\n`;
    fs.appendFile(logFilePath, logEntry_3, err => err ? console.error('NR res error log xəta:', err) : console.log('NR error log yazıldı'));
    return NextResponse.json(
      //@ts-ignore
      error.response?.data,
      { status: 500 }
    );
  }
}
