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
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Order',
              name: 'order',
              type: 'string',
            },
            {
              title: 'IsRegister',
              name: 'isRegister',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  ],
}
