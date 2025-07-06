// File: src/app/blog/[slug]/page.tsx
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

// ลบ type Props เก่าออกไป

async function getArticle(slug: string) {
    // แก้ไขการเรียกใช้เป็น db
    return db.article.findUnique({
        where: { slug: slug },
    });
}

// กำหนด Type ของ params โดยตรงในฟังก์ชัน
export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="prose lg:prose-xl max-w-none mx-auto py-8">
            <h1 className="mb-4">{article.title}</h1>
            {/* ใช้ whitespace-pre-wrap เพื่อให้การขึ้นบรรทัดใหม่แสดงผลถูกต้อง */}
            <p className="whitespace-pre-wrap">{article.content}</p>
        </article>
    );
}