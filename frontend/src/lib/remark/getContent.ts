import path from "path";
import fs from "fs";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "src", "content", "books");

export interface Book {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  cover_image: string;
  amazon_link: string;
  category: string;
  format: string;
  genre: string[];
  tags: string[];
  language: string;
  market: string;
  word_count_range?: string;
  poem_count?: string;
  page_count?: string;
}

export async function getAllBooksData(): Promise<Book[]> {
  const fileNames = fs.readdirSync(booksDirectory);

  const allBooksData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx?$/, "");

      const fullPath = path.join(booksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        content: matterResult.content,
        ...matterResult.data,
      };
    });

  return allBooksData;
}
