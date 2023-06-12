export default {
  title: 'Monster',
  name: 'monster',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Information',
      name: 'information',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'information'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
}
