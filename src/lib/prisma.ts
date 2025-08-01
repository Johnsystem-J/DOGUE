// File: src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

// export default prisma  <-- ลบอันเก่าออก
export const db = prisma // <-- ใช้อันนี้แทน

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma