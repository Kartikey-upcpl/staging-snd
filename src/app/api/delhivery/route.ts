// /app/api/delhivery/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const heavyToken = process.env.DELHIVERY_STARDAISY_HEAVY_TOKEN;
const surfaceToken = process.env.DELHIVERY_STARDAISY_SURFACE_TOKEN;

const tokens = [heavyToken, surfaceToken];




function createHeaders(token: string | undefined): HeadersInit {
    return token ? { Authorization: token } : {};
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const waybill = searchParams.get('awb_code');

    if (!waybill) {
        return NextResponse.json(
            { success: false, message: 'Please enter a waybill/order ID.' },
            { status: 400 }
        );
    }

    let response: any = null;
    let successful = false;

    // Loop through tokens to attempt API calls
    for (const token of tokens) {

        if (!token) continue;

        try {
            const apiUrl = `https://track.delhivery.com/api/v1/packages/json/?waybill=${encodeURIComponent(
                waybill
            )}`;

            const apiResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: createHeaders(token),

            });

            const httpCode = apiResponse.status;
            response = await apiResponse.json();

            // If the API call is successful, break out of the loop
            if (httpCode === 200 && response?.ShipmentData?.length) {
                successful = true;
                break;
            }
        } catch (error) {
            console.error(`Error fetching data with token ${token}:`, error);
        }
    }

    if (successful) {
        return NextResponse.json(response, { status: 200 });
    } else {
        console.error(`No valid tracking information found for waybill: ${waybill}`);
        return NextResponse.json(
            { success: false, message: 'No valid tracking information found.' },
            { status: 404 }
        );
    }
}