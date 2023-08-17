const STATES = [
  {title: '회피하는', value: '회피하는'},
  {title: '튼튼한', value: '튼튼한'},
  {title: '끈끈한', value: '끈끈한'},
  {title: '재생하는', value: '재생하는'},
  {title: '석화의', value: '석화의'},
  {title: '멈추지 않는', value: '멈추지 않는'},
  {title: '암흑의', value: '암흑의'},
  {title: '독을 뿌리는', value: '독을 뿌리는'},
  {title: '마법저항의', value: '마법저항의'},
  {title: '지휘관', value: '지휘관'},
  {title: '혼란의', value: '혼란의'},
  {title: '봉인의', value: '봉인의'},
  {title: '허약의', value: '허약의'},
  {title: '맹독의', value: '맹독의'},
  {title: '포션을 싫어하는', value: '포션을 싫어하는'},
  {title: '언데드', value: '언데드'},
  {title: '기절시키는', value: '기절시키는'},
  {title: '역병의', value: '역병의'},
  {title: '변신술사', value: '변신술사'},
  {title: '검은 사슬의', value: '검은 사슬의'},
]

export default {
  title: 'EliteMonster',
  name: 'eliteMonster',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Modifier',
      name: 'modifier',
      type: 'object',
      fields: [
        {
          title: 'First',
          name: 'first',
          type: 'string',
          options: {
            list: STATES,
            layout: 'dropdown',
          },
        },
        {
          title: 'Second',
          name: 'second',
          type: 'string',
          options: {
            list: STATES,
            layout: 'dropdown',
          },
        },
      ],
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
  ],
}
