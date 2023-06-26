const STATES = [
  {title: '일반', value: 'N'},
  {title: '퀘스트', value: 'Q'},
  {title: '파티 퀘스트', value: 'PQ'},
  {title: '보스', value: 'B'},
  {title: '던전', value: 'T'},
  {title: '테마던전', value: 'TD'},
  {title: '몬스터파크', value: 'M'},
]

export default {
  title: 'Information',
  name: 'information',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      description: '서브카테고리(몬스터)',
      type: 'string',
    },

    {
      title: 'Monsters',
      name: 'monsters',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'monster'}],
        },
      ],
    },
    {
      title: 'Youtube',
      name: 'youtube',
      type: 'string',
    },
    {
      title: 'Registers',
      name: 'registers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Tag',
              name: 'tag',
              type: 'string',
              options: {
                list: STATES,
                layout: 'dropdown',
              },
            },
            {
              title: 'IsDescriptionsGroup',
              name: 'isDescriptionsGroup',
              type: 'boolean',
            },
            {
              title: 'Descriptions',
              name: 'descriptions',
              type: 'array',
              of: [{title: 'Message', name: 'message', type: 'string'}],
            },
            {
              title: 'Job',
              name: 'job',
              type: 'string',
            },
            {
              title: 'Quest',
              name: 'quest',
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
                      title: 'Level',
                      name: 'level',
                      type: 'string',
                    },
                    {
                      title: 'Description',
                      name: 'description',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Location',
              name: 'location',
              type: 'object',
              fields: [
                {
                  title: 'Main',
                  name: 'main',
                  type: 'string',
                },
                {
                  title: 'Sub',
                  name: 'sub',
                  type: 'string',
                },
              ],
            },
            {
              title: 'Timer',
              name: 'timer',
              type: 'string',
            },
            {
              title: 'Boss',
              name: 'boss',
              type: 'object',
              fields: [
                {
                  title: 'Name',
                  name: 'name',
                  type: 'string',
                },
                {
                  title: 'Difficulty',
                  name: 'difficulty',
                  type: 'string',
                },
                {
                  title: 'Description',
                  name: 'description',
                  type: 'string',
                },
              ],
            },
          ],
          preview: {
            select: {
              state: 'tag',
            },
            prepare: ({state}) => {
              const stateName =
                state && STATES.flatMap((option) => (option.value === state ? [option.title] : []))
              return {
                title: state ? `${stateName} (${state})` : 'No state selected',
              }
            },
          },
        },
      ],
    },

    // preview: {
    //   select: {
    //     media: 'monsters.0.image',
    //   },
    //   prepare: (selection) => {
    //     return {...selection, title: '대표 이미지'}
    //   },
    // },
  ],
}
