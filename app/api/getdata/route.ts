import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: any, res: any) {
  try {
    const medata = await req.json(); // Access request body correctly
    console.log(medata);

    const response = await axios.get(
      'http://172.16.30.26:8283/v1/api/customers/contracts/all',
      {
        headers: {
          'vendor-id': 'PAYRIFF',
          'Content-Type': 'application/json',
        },
        data: medata,
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
