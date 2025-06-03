import fs from "fs";
import { MetadataRoute } from "next";
import path from "path";
import { databases, COLLECTION_ID, DATABASE_ID, Query } from '../lib/appwrite';

const baseUrl = "https://simpmusic.org";
const baseDir = "src/app";
const excludeDirs = ["api", "fonts"];

export const revalidate = 3600 // revalidate at most every hour


async function getRoutes(): Promise<MetadataRoute.Sitemap> {
    const fullPath = path.join(process.cwd(), baseDir);
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    let routes: string[] = ["/"];

    entries.forEach((entry) => {
        if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
        routes.push(`/${entry.name}`);
        }
    });

    // to create dynamic routes.
    async function getBlogs() {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc('createdAt')]
        );
        const blogsViRoute: string[] = response.documents.map(
            (blog: any) => `/blogs/vi/${blog.slug}`
        );
        const blogsEnRoute: string[] = response.documents.map(
            (blog: any) => `/blogs/en/${blog.slug}`
        );
        routes = [...routes, ...blogsViRoute, ...blogsEnRoute];
    }

    await getBlogs();

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
    }));
}

export default function sitemap() {
    return getRoutes();
}  