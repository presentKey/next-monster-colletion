export default {
  title: 'Nonmember',
  name: 'nonmember',
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
              title: 'Elite',
              name: 'elite',
              type: 'reference',
              to: [{type: 'eliteMonster'}],
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
