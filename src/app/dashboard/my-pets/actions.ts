// File: src/app/dashboard/my-pets/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth'; // 1. Import auth
import { db } from '@/lib/prisma';

export async function createPet(formData: FormData) {
    const session = await auth(); // 2. เรียกใช้ auth()
    if (!session || !session.user?.id) {
        throw new Error('You must be signed in to create a pet.');
    }

    const name = formData.get('name') as string;
    const petType = formData.get('petType') as string;
    const breed = formData.get('breed') as string;

    if (!name || !petType) {
        throw new Error('Name and Pet Type are required.');
    }

    await db.pet.create({
        data: {
            name,
            petType,
            breed,
            ownerId: session.user.id,
        },
    });

    revalidatePath('/dashboard/my-pets');
}