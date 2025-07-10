// File: src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
        Welcome to <span className="text-blue-600">DOGUE.</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        The future of pet wellness is here. All-in-one services for your beloved pets, from health records to finding the best care near you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard/my-pets" className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors">
          Go to Dashboard
        </Link>
        <Link href="/services" className="bg-white text-black border border-gray-300 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
          Explore Services
        </Link>
      </div>
    </div>
  );
}