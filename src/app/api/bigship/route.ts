// /app/api/bigship/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



const username = process.env.BIGSHIP_AUTH_USERNAME;
const password = process.env.BIGSHIP_AUTH_PASSWORD;
const accessKey = process.env.BIGSHIP_AUTH_ACCESSKEY;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('awb_code');

    if (!trackingNumber) {
        return NextResponse.json(
            { success: false, message: 'Tracking number is required.' },
            { status: 400 }
        );
    }

    try {
        // Step 1: Login to BigShip API and get a token
        const loginResponse = await fetch('https://api.bigship.in/api/login/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_name: username,
                password: password,
                access_key: accessKey,
            }),
        });

        const loginData = await loginResponse.json();
        const token = loginData?.data?.token;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Failed to generate token.' },
                { status: 401 }
            );
        }

        // Step 2: Use the token to fetch tracking information
        const trackingResponse = await fetch(
            `https://appapinew.bigship.in/api/OrderTrack/Track/${trackingNumber}?search_type=awb`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const trackingData = await trackingResponse.json();

        if (trackingResponse.status !== 200) {
            return NextResponse.json(
                { success: false, message: 'Failed to fetch tracking information.' },
                { status: trackingResponse.status }
            );
        }

        return NextResponse.json({ success: true, data: trackingData });
    } catch (error) {
        console.error('Error fetching tracking data:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}