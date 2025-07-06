// File: src/components/AuthButtons.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButtons() {
    const { data: session } = useSession();

    if (session) {
        // ส่วนของผู้ใช้ที่ Login อยู่
        return (
            <div className="flex items-center gap-4">
                <Link href="/dashboard/my-pets" className="text-sm font-semibold">
                    My Pets
                </Link>
                <button
                    onClick={() => signOut()}
                    className="bg-gray-200 text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    // ส่วนของผู้ใช้ที่ยังไม่ได้ Login
    return (
        <div className="flex items-center gap-4">
            <Link href="/register" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                Sign Up
            </Link>
            {/* แก้ไขตรงนี้: เปลี่ยนจาก button ที่เรียก signIn() เป็น Link ที่ชี้ไป /login */}
            <Link
                href="/login"
                className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
                Sign In
            </Link>
        </div>
    );
}