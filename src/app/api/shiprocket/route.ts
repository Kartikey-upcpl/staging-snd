// /app/api/shiprocket/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Shiprocket credentials
const email = process.env.SHIPROCKET_AUTH_EMAIL;
const password = process.env.SHIPROCKET_AUTH_PASSWORD;

// Function to get the access token
async function getAccessToken(): Promise<string | null> {
  const url = 'https://apiv2.shiprocket.in/v1/external/auth/login';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  return data.token || null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const awbCode = searchParams.get('awb_code');

  if (!awbCode) {
    console.error('AWB code not provided.');
    return NextResponse.json(
      { error: 'AWB code not provided.' },
      { status: 400 }
    );
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error('Failed to retrieve access token.');
    return NextResponse.json(
      { error: 'Failed to retrieve access token.' },
      { status: 401 }
    );
  }

  const url = `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      console.error(`Failed to fetch tracking info for AWB: ${awbCode}`);
      return NextResponse.json(
        { error: 'Failed to fetch tracking information.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error fetching tracking information:', error);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}