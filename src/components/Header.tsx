// File: src/components/Header.tsx
import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-gray-900 tracking-tighter">
                    DOGUE.
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/services" className="text-gray-600 hover:text-black transition-colors">Services</Link>
                    <Link href="/vets" className="text-gray-600 hover:text-black transition-colors">Find a Vet</Link>
                    <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">Blog</Link>
                </div>
                <AuthButtons />
            </nav>
        </header>
    );
}