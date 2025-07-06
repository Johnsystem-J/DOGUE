// File: src/app/blog/[slug]/page.tsx
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

// 1. สร้าง Type ที่สมบูรณ์ตามมาตรฐาน Next.js
type PageProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
};

async function getArticle(slug: string) {
    return db.article.findUnique({
        where: { slug: slug },
    });
}

// 2. ใช้ PageProps ที่เราสร้างขึ้น
export default async function ArticlePage({ params }: PageProps) {
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