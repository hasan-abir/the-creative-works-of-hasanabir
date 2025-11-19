import { createClient } from "next-sanity";
import stories from "@/utils/fixtures/stories.json";
import poems from "@/utils/fixtures/poems.json";
import storyPages from "@/utils/fixtures/story_pages.json";

export const client = createClient({
  projectId: "n4zh8b7w",
  dataset: "production",
  perspective:
    process.env.IS_PUBLISHED && process.env.IS_PUBLISHED === "1"
      ? "published"
      : "raw",
  apiVersion: "2023-05-03", // https://www.sanity.io/docs/api-versioning,
  useCdn: false, // https://github.com/sanity-io/next-sanity?tab=readme-ov-file#should-usecdn-be-true-or-false
});

export const fetchData = async <T>(
  query: string,
  params?: { slug?: string; page?: string }
): Promise<T> => {
  if (process.env.E2ET) {
    if (query.includes(`[_type == "story"]`)) {
      return stories.list as T;
    } else if (
      params &&
      query.includes(`[_type == "story" && slug.current == "${params.slug}"]`)
    ) {
      return stories.list.filter(
        (item) => item.slug.current === params.slug
      ) as T;
    } else if (params && query.includes(`[_type == "storyPage"]`)) {
      return storyPages.list as T;
    } else if (
      params &&
      query.includes(
        `[_type == "storyPage" && story->slug.current == "${params.slug}" && pageNumber == ${params.page}]`
      )
    ) {
      return storyPages.list.filter(
        (item) =>
          item.story.slug.current === params.slug &&
          item.pageNumber === parseInt(params.page || "0")
      ) as T;
    } else if (
      params &&
      query.includes(
        `count(*[_type == "storyPage" && story->slug.current == "${params.slug}"])`
      )
    ) {
      return storyPages.list.filter(
        (item) => item.story.slug.current === params.slug
      ).length as T;
    } else if (query.includes(`[_type == "poem"]`)) {
      return poems.list as T;
    } else if (
      params &&
      query.includes(`[_type == "poem" && slug.current == "${params.slug}"]`)
    ) {
      return poems.list.filter(
        (item) => item.slug.current === params.slug
      ) as T;
    }

    return [] as T;
  }

  return await client.fetch<T>(query);
};
