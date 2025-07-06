// File: src/app/blog/[slug]/page.tsx
import { db as prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string };
};

async function getArticle(slug: string) {
    return prisma.article.findUnique({
        where: { slug: slug },
    });
}

export default async function ArticlePage({ params }: Props) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="prose lg:prose-xl max-w-none">
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </article>
    );
}