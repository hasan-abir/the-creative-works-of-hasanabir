import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const getStoryData = async (slug: string, pageNum?: number) => {
  let fileName = "info.md";

  if (pageNum) fileName = `page-${pageNum}.md`;

  const fullPath = path.join(`src/markdowns/stories/${slug}/`, fileName);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...matterResult.data,
  };
};
