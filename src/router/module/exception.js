const exceptionRouter = [
  {
    path: '/401',
    name: 'ex_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/401.vue')
  }, {
    path: '/500',
    name: 'ex_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/500.vue')
  }, {
    path: '*',
    name: 'ex_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/exception/404.vue')
  }
]

export default exceptionRouter
