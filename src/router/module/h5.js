const H5Router = [
  {
    path: '/h5',
    redirect: '/h5/checkbox',
    component: () => import('@/views/h5/Home.vue'),
    children: [
      {
        path: '/h5/checkbox',
        name: 'checkbox',
        meta: {
          title: '多选框'
        }
      },
      {
        path: '/h5/calendar',
        name: 'calendar',
        meta: {
          title: '日历'
        }
      }
    ]
  }
]

export default H5Router
