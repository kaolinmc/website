import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const docsDirectory = path.join(process.cwd(), 'docs');
    const fullPath = path.join(docsDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const allDocs = fs.readdirSync(docsDirectory).map((filename) => {
            const fileSlug = filename.replace(/\.md$/, '');
            const fileContent = fs.readFileSync(path.join(docsDirectory, filename), 'utf8');
            const { data: fileData } = matter(fileContent);
            return { slug: fileSlug, title: fileData.title || fileSlug, order: fileData.order, ignore: (fileData.ignore ?? false) };
        });

        return NextResponse.json({ content: content, data, slug, allDocs });
    } catch (error) {
        console.error(`Error reading doc file for slug ${slug}:`, error);
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
}