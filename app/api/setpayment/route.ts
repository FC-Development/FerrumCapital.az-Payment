import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import dayjs from 'dayjs';
import fs from 'fs/promises';
import path from 'path';

axiosCurlirize(axios);

const logFilePath = path.join(process.cwd(), 'logs', 'server.log');
const logDir = path.dirname(logFilePath);

async function ensureLogDirExists(dir: string): Promise<void> {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function appendLog(entry: string): Promise<void> {
  try {
    await fs.appendFile(logFilePath, entry);
  } catch (err) {
    console.error('Log error:', err);
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  return NextResponse.redirect(`https://payment.ferrumcapital.az/payment?res_rtm=approve`);
}

interface Metadata {
  description?: string;
  orderId?: string;
  amount?: number;
  payload?: {
    description?: string;
    orderId?: string;
    amount?: number;
    paymentStatus?: string;
  };
}

export async function POST(req: Request): Promise<NextResponse> {
  const url = process.env.PROD_SET_PAYMENT_API_URL || '';
  const metadata: Metadata = await req.json();

  await ensureLogDirExists(logDir);

  const logEntry_1 = `${new Date().toISOString()} - Payriff post payload: - ${JSON.stringify(metadata)}\n`;
  await appendLog(logEntry_1);

  // Check if paymentStatus is not DECLINED
  if (metadata.payload?.paymentStatus !== "DECLINED") {
    try {
      const payload = {
        docItemNumber: metadata.description || metadata.payload?.description,
        pinCode: "0",
        transactId: metadata.orderId || metadata.payload?.orderId,
        paymentDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        amount: metadata.amount || metadata.payload?.amount,
      };
      const logEntry_2 = `${new Date().toISOString()} - Our payload: - ${JSON.stringify(payload)}\n`;
      await appendLog(logEntry_2);

      const serviceResponse = await axios.post(url, payload, {
        headers: {
          'vendor-id': 'PAYRIFF',
          'Content-Type': 'application/json',
        },
      });
      const logEntry_3 = `${new Date().toISOString()} - NR res success: - ${JSON.stringify(serviceResponse.data)}\n\n`;
      await appendLog(logEntry_3);

      return NextResponse.json(
        { 
          fc_service_nr: "ok", 
          fc_service_response: serviceResponse.data
        },
        { status: 200 }
      );
      
    } catch (error: any) {
      const errorData = error.response?.data || error.message || 'Unknown error';
      const logEntry_3 = `${new Date().toISOString()} - NR res error: - ${JSON.stringify(errorData)}\n\n`;
      await appendLog(logEntry_3);

      return NextResponse.json(errorData, { status: 500 });
    }
  } else {
    // Log and return a response if the payment status is DECLINED
    const logEntry_4 = `${new Date().toISOString()} - Payment status is DECLINED, not proceeding with the request.\n\n`;
    await appendLog(logEntry_4);
    return NextResponse.json(
      { error: "Payment status is DECLINED, request not processed." },
      { status: 400 }
    );
  }
}