import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: any, res: any) {
  const url = process.env.TEST_API_URL || '';
  try {
    const medata = await req.json(); // Access request body correctly
    console.log(medata);

    const response = await axios.get(url, {
      headers: {
        'vendor-id': 'PAYRIFF',
        'Content-Type': 'application/json',
      },
      data: medata,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
