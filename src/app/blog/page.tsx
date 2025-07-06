// File: src/app/blog/page.tsx
import { db } from "@/lib/prisma"; // แก้ไขแล้ว
import Link from "next/link";

async function getArticles() {
    return db.article.findMany({ // แก้ไขแล้ว
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">DOGUE's Blog</h1>
            <div className="space-y-6">
                {articles.map((article) => (
                    <Link href={`/blog/${article.slug}`} key={article.id} className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-600 line-clamp-2">{article.content}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}