// File: src/app/register/actions.ts
'use server';

import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        throw new Error('Please fill in all fields.');
    }

    // ตรวจสอบว่ามีอีเมลนี้ในระบบแล้วหรือยัง
    const existingUser = await db.user.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        throw new Error('This email is already registered.');
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง User ใหม่ในฐานข้อมูล
    await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword, // บันทึกรหัสผ่านที่เข้ารหัสแล้ว
        },
    });

    // เมื่อสมัครเสร็จ ให้พาไปหน้า login
    redirect('/api/auth/signin');
}