import path from "path";
import fs from "fs";
import fsPromises from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";
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
  blurUrl: string;
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
  path: string;
  slug: string;
}

export interface Painting {
  id: string;
  title: string;
  date_created: string;
  thumbnail: string;
  blurUrl: string;
  category: string;
  medium: string;
  style: string[];
  tags: string[];
  dimensions: string;
  availability: string;
  path: string;
  slug: string;
}

export interface Song {
  id: string;
  title: string;
  date_created: string;
  song_preview: string;
  category: string;
  style: string[];
  tags: string[];
  path: string;
  slug: string;
}

interface ImgData {
  src: string;
  blurSrc: string;
}

async function getImgData(data: {
  [key: string]: any;
}): Promise<ImgData | null> {
  const imgSrc = (data as Book).cover_image || (data as Painting).thumbnail;
  let imgBlur = "";

  if (imgSrc) {
    const file = await fsPromises.readFile(`./public${imgSrc}`);

    const { base64 } = await getPlaiceholder(file);
    imgBlur = base64;

    return { src: imgSrc, blurSrc: imgBlur };
  }
  return null;
}

export async function getAllContentData<T>(folder: string): Promise<T[]> {
  const directory = contentDirectory(folder);
  const fileNames = fs.readdirSync(directory);

  const allContentData = await Promise.all(
    fileNames
      .filter(
        (fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"),
      )
      .map(async (fileName) => {
        const id = fileName.replace(/\.mdx?$/, "");

        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        const imgData = await getImgData(matterResult.data);

        const returnValue = {
          id,
          content: matterResult.content,
          ...matterResult.data,
          path: `${folder}/${id}`,
          slug: `/work/${id}/`,
          blurUrl: imgData ? imgData.blurSrc : undefined,
        };

        if (matterResult.content) {
          returnValue["content"] = matterResult.content;
        }

        return returnValue as T;
      }),
  );

  allContentData.sort((a, b) => {
    const bDate = new Date(
      (b as Book).published_date || (b as Song | Painting).date_created,
    );
    const aDate = new Date(
      (a as Book).published_date || (a as Song | Painting).date_created,
    );

    return bDate.getTime() - aDate.getTime();
  });

  return allContentData;
}

export async function getContentData<T>(filePath: string): Promise<T | null> {
  filePath = contentDirectory(filePath) + ".md";

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // file exists and was read

    const id = fileContent.replace(/\.mdx?$/, "");

    const matterResult = matter(fileContent);
    const imgData = await getImgData(matterResult.data);

    const returnValue = {
      id,
      content: matterResult.content,
      ...matterResult.data,
      blurUrl: imgData ? imgData.blurSrc : undefined,
    };

    if (matterResult.content) {
      returnValue["content"] = matterResult.content;
    }

    return returnValue as T;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return null;
    } else {
      throw err;
    }
  }
}

export function getTheLatestContent() {
  const dir = contentDirectory("");

  if (!fs.existsSync(dir)) return "books/our-chores";

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdir = contentDirectory(entry.name);

      const subentries = fs.readdirSync(subdir, { withFileTypes: true });

      for (const subentry of subentries) {
        const filePath = entry.name + "/" + subentry.name;
        files.push(filePath.split(".md")[0]);
      }
    }
  }

  if (files.length > 1) {
    return files[Math.floor(Math.random() * files.length)];
  } else {
    return "books/our-chores";
  }
}
