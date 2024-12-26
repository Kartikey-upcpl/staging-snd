import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const appId = process.env.INTERCOM_APP_ID;

    if (!appId) {
        return NextResponse.json(
            { success: false, message: 'App Id not found' },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { success: true, appId },
        { status: 200 }
    );
}
