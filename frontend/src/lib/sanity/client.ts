import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'n4zh8b7w',
  dataset: 'production',
  apiVersion: '2023-05-03', // https://www.sanity.io/docs/api-versioning,
  useCdn: false // https://github.com/sanity-io/next-sanity?tab=readme-ov-file#should-usecdn-be-true-or-false
})