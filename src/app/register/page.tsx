// File: src/app/register/page.tsx
import { registerUser } from './actions';
import { signIn } from "@/auth"
import Link from 'next/link';

// ใช้ SocialButton เดียวกันกับหน้า Login
function SocialButton({ provider, label, logo }: { provider: string, label: string, logo: string }) {
    return (
        <form action={async () => {
            "use server"
            await signIn(provider, { redirectTo: "/dashboard/my-pets" })
        }}>
            <button type="submit" className="w-full py-2.5 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <img src={logo} alt={`${label} logo`} className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </button>
        </form>
    )
}

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
                <form action={registerUser} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Full Name</label>
                        <input type="text" name="name" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email Address</label>
                        <input type="email" name="email" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                        <input type="password" name="password" required minLength={6} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        Sign Up
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <SocialButton provider="google" label="Continue with Google" logo="https://authjs.dev/img/providers/google.svg" />
                    <SocialButton provider="facebook" label="Continue with Facebook" logo="https://authjs.dev/img/providers/facebook.svg" />
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}