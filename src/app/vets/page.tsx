// File: src/app/vets/page.tsx
import { db } from "@/lib/prisma"; // 1. แก้ไขการ import

async function getLocations() {
    return db.serviceLocation.findMany(); // 2. แก้ไขการเรียกใช้
}

export default async function VetsPage() {
    const locations = await getLocations();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Find a Vet or Service</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                    <div key={location.id} className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-bold mb-2">{location.name}</h2>
                        <p className="text-gray-500 mb-1">{location.serviceType}</p>
                        <p className="text-gray-700">{location.address}</p>
                        {location.phone && <p className="text-blue-600 mt-2">Tel: {location.phone}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}