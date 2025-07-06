// File: src/app/login/page.tsx
import { signIn } from "@/auth"
import Link from "next/link"
import Image from "next/image" // 1. Import Image

function SocialButton({ provider, label, logo }: { provider: string, label: string, logo: string }) {
    return (
        <form action={async () => {
            "use server"
            await signIn(provider, { redirectTo: "/dashboard/my-pets" })
        }}>
            <button type="submit" className="w-full py-2.5 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                {/* 2. เปลี่ยนเป็น Image component */}
                <Image src={logo} alt={`${label} logo`} width={20} height={20} />
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </button>
        </form>
    )
}

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
                <form action={async (formData) => {
                    "use server"
                    await signIn("credentials", formData)
                }} className="space-y-4">
                    {/*... form inputs ...*/}
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Sign In
                    </button>
                </form>
                <div className="relative my-6">{/* ... divider ... */}</div>
                <div className="space-y-3">
                    <SocialButton provider="google" label="Continue with Google" logo="https://authjs.dev/img/providers/google.svg" />
                    <SocialButton provider="facebook" label="Continue with Facebook" logo="https://authjs.dev/img/providers/facebook.svg" />
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                    {/* 3. แก้ไข ' */}
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}