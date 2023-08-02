export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'UID',
      name: 'uid',
      type: 'string',
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'monster'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'EliteCollections',
      name: 'eliteCollections',
      type: 'string',
    },
  ],
}
