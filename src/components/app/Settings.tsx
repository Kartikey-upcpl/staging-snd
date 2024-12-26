'use client';

import { useEffect } from 'react';
import { initSetting } from '@/app/actions';

export default function Settings() {
    useEffect(() => {
        initSetting();
    }, []);
    return null;
}