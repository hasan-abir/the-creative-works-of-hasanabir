import { createClient } from "next-sanity";
import stories from "@/utils/fixtures/stories.json";

export const client = createClient({
  projectId: "n4zh8b7w",
  dataset: "production",
  apiVersion: "2023-05-03", // https://www.sanity.io/docs/api-versioning,
  useCdn: false, // https://github.com/sanity-io/next-sanity?tab=readme-ov-file#should-usecdn-be-true-or-false
});

export const fetchData = async <T>(
  query: string,
  params?: { slug?: string }
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
    }

    return [] as T;
  }

  return await client.fetch<T>(query);
};
