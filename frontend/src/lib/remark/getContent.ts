import path from "path";
import fs from "fs";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "src", "content", "books");

export async function getAllBooksData() {
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
        ...matterResult.data,
      };
    });

  return allBooksData;
}
