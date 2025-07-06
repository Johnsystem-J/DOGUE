// File: src/app/blog/[slug]/page.tsx
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

// เราจะไม่ใช้ generateStaticParams ในตอนนี้เพื่อลดความซับซ้อน

async function getArticle(slug: string) {
    return db.article.findUnique({
        where: { slug: slug },
    });
}

// --- แก้ไข Type ตรงนี้เป็น any ---
export default async function ArticlePage({ params }: any) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="prose lg:prose-xl max-w-none mx-auto py-8">
            <h1 className="mb-4">{article.title}</h1>
            <p className="whitespace-pre-wrap">{article.content}</p>
        </article>
    );
}