import exceptionRouter from './module/exception'
import PCRouter from './module/pc'
import H5Router from './module/h5'

const routes = [
  {
    path: '/',
    component: () => import('@/layout'),
    children: [
      {
        path: '/',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home/Home.vue')
      },
      ...PCRouter,
      ...H5Router,
      ...exceptionRouter
    ]
  }
]

export default routes
