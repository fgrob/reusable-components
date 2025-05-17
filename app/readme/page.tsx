// app/readme/page.tsx
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";
import Markdown from "react-markdown";

export const generateMetadata = async ({ searchParams }: { searchParams: { path?: string } }): Promise<Metadata> => {
  const name = searchParams?.path?.split("/").pop() || "README";
  return { title: `📘 ${name}` };
};

const getMarkdownContent = cache((filePath: string) => {
  try {
    const fullPath = path.join(process.cwd(), "app", filePath);
    return fs.readFileSync(fullPath, "utf8");
  } catch {
    return null;
  }
});

export default function ReadmePage({ searchParams }: { searchParams: { path?: string } }) {
  const relativePath = searchParams?.path;

  if (!relativePath) return <p className="p-6 text-red-500">No se especificó ninguna ruta.</p>;

  const content = getMarkdownContent(relativePath);
  if (!content) return notFound();

  return (
    <main className="prose max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <Markdown>{content}</Markdown>
    </main>
  );
}
