import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'poem',
  title: 'Poem',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'startedAt',
      title: 'Started at',
      type: 'date',
    }),
    defineField({
      name: 'finishedAt',
      title: 'Finished at',
      type: 'date',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
