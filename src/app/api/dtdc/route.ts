// /app/api/dtdc/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// DTDC API URL
const url = "https://blktracksvc.dtdc.com/dtdc-api/rest/JSONCnTrk/getTrackDetails";

// DTDC Account Credentials
const accounts = [
  {
    customerCode: process.env.DTDC_ACCOUNT1_CUSTOMER_CODE!,
    apiKey: process.env.DTDC_ACCOUNT1_API_KEY!,
    serviceTypeId: process.env.DTDC_ACCOUNT1_SERVICE_TYPE_ID!,
    accessToken: process.env.DTDC_ACCOUNT1_ACCESS_TOKEN!,
    username: process.env.DTDC_ACCOUNT1_USERNAME!,
    password: process.env.DTDC_ACCOUNT1_PASSWORD!,
  },
  {
    customerCode: process.env.DTDC_ACCOUNT2_CUSTOMER_CODE!,
    apiKey: process.env.DTDC_ACCOUNT2_API_KEY!,
    serviceTypeId: process.env.DTDC_ACCOUNT2_SERVICE_TYPE_ID!,
    accessToken: process.env.DTDC_ACCOUNT2_ACCESS_TOKEN!,
    username: process.env.DTDC_ACCOUNT2_USERNAME!,
    password: process.env.DTDC_ACCOUNT2_PASSWORD!,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get('awb_code');

  if (!trackingNumber) {
    return NextResponse.json(
      { success: false, message: 'Please provide a consignment number.' },
      { status: 400 }
    );
  }

  for (const account of accounts) {
    try {
      const postData = JSON.stringify({
        trkType: 'cnno',
        strcnno: trackingNumber,
        addtnlDtl: 'Y',
      });

      const headers = {
        'Content-Type': 'application/json',
        'X-Access-Token': account.accessToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: postData,
      });

      const httpCode = response.status;
      const data = await response.json();


      if (httpCode === 200 && data.status === 'SUCCESS') {
        return NextResponse.json({
          success: true,
          data: {
            orderDetail: data.trackHeader,
            awbTrackingDetails: data.trackDetails,
          },
          message: 'Tracking information retrieved successfully.',
        });
      } else {
        const errorDetails = data?.errorDetails?.[0]?.value || 'Unknown error';
        console.error(`Failed to retrieve data from account: ${account.customerCode}. Error: ${errorDetails}`);
      }
    } catch (error) {
      console.error(`Error fetching data with account: ${account.customerCode}.`, error);
    }
  }

  console.error('Tracking information not found on any account.');
  return NextResponse.json(
    { success: false, message: 'Tracking information not found on any account.' },
    { status: 404 }
  );
}