import path from "path";
import fs from "fs";
import matter from "gray-matter";

const contentDirectory = (folder: string) =>
  path.join(process.cwd(), "src", "content", folder);

export interface Book {
  id: string;
  title: string;
  content: string;
  content_short: string;
  published_date: string;
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

export interface Painting {
  id: string;
  title: string;
  date_created: string;
  thumbnail: string;
  category: string;
  medium: string;
  style: string[];
  tags: string[];
  dimensions: string;
  availability: string;
}

export interface Song {
  id: string;
  title: string;
  date_created: string;
  song_preview: string;
  category: string;
  style: string[];
  tags: string[];
}

export async function getAllContentData<T>(folder: string): Promise<T[]> {
  const directory = contentDirectory(folder);
  const fileNames = fs.readdirSync(directory);

  const allContentData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx?$/, "");

      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const returnValue = {
        id,
        content: matterResult.content,
        ...matterResult.data,
      };

      if (matterResult.content) {
        returnValue["content"] = matterResult.content;
      }

      return returnValue as T;
    });

  return allContentData;
}
