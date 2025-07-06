// File: src/app/dashboard/my-pets/page.tsx
import { Pet } from '@prisma/client';
import { createPet } from './actions';
import { auth } from '@/auth'; // 1. Import auth
import { db } from '@/lib/prisma';

export default async function MyPetsPage() {
  const session = await auth(); // 2. เรียกใช้ auth()

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to see your pets.</p>
  }

  const pets = await db.pet.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* ... โค้ดส่วน form และการแสดงผลเหมือนเดิม ... */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">Add New Pet</h2>
        <form action={createPet} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
            <input type="text" name="name" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
          </div>
          <div>
            <label htmlFor="petType" className="block text-sm font-semibold text-gray-600">Type</label>
            <select name="petType" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="breed" className="block text-sm font-semibold text-gray-600">Breed</label>
            <input type="text" name="breed" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Add Pet
          </button>
        </form>
      </div>

      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">My Pets ({pets.length})</h1>
        <div className="space-y-4">
          {pets.length === 0 ? (
            <p className="text-gray-500">You haven&apos;t added any pets yet.</p>
          ) : (
            pets.map((pet: Pet) => (
              <div key={pet.id} className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold">{pet.name}</p>
                  <p className="text-gray-500">{pet.breed || pet.petType}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}