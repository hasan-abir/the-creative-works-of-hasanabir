import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'storyPage',
  title: 'Story Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageNumber',
      title: 'Page Number',
      type: 'number',
    }),
    defineField({
      type: 'reference',
      name: 'story',
      to: [{type: 'story'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      story: 'story.title',
      pageNumber: 'pageNumber',
    },
    prepare(selection) {
      const {story, pageNumber} = selection
      const title = `Page ${pageNumber || 'number'} of ${story || 'A Story'}`

      return {
        title,
      }
    },
  },
})
