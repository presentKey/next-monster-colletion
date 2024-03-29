export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Path',
      name: 'path',
      type: 'string',
    },
    {
      title: 'Order',
      name: 'order',
      type: 'number',
    },
    {
      title: 'SubCategory',
      name: 'subCategory',
      type: 'array',
      of: [
        {
          title: 'SubDetail',
          name: 'subDetail',
          type: 'document',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
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
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
}
