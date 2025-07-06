// File: src/app/blog/[slug]/page.tsx
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

// --- เพิ่มฟังก์ชันนี้เข้ามา ---
export async function generateStaticParams() {
    const articles = await db.article.findMany({
        where: { published: true },
        select: { slug: true },
    });

    return articles.map((article) => ({
        slug: article.slug,
    }));
}

async function getArticle(slug: string) {
    return db.article.findUnique({
        where: { slug: slug },
    });
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
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