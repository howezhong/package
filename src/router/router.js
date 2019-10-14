import exceptionRouter from './module/exception'

const routes = [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    component: () => import('@/layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/Home.vue'),
        children: [
          {
            path: '/digital-roll',
            name: 'digital-roll',
            meta: {
              title: '数字滚动'
            },
            component: () => import('@@/digitalRoll')
          }, {
            path: '/lantern',
            name: 'lantern',
            meta: {
              title: '走马灯'
            },
            component: () => import('@@/lantern')
          }, {
            path: '/pagination',
            name: 'pagination',
            meta: {
              title: '分页'
            },
            component: () => import('@/example/Page.vue')
          }, {
            path: '/swipe',
            name: 'swipe',
            meta: {
              title: '轮播图'
            }
          }, {
            path: '/sidebar',
            name: 'sidebar',
            meta: {
              title: '侧边栏'
            }
          }, {
            path: '/dialog',
            name: 'dialog',
            meta: {
              title: '弹窗'
            },
            component: () => import('@/example/Dialog.vue')
          }, {
            path: '/select',
            name: 'select',
            meta: {
              title: '下拉选择器'
            }
          }, {
            path: '/404',
            name: '404',
            meta: {
              title: '日历(H5)'
            }
          },
          ...exceptionRouter
        ]
      }
    ]
  }
]

export default routes
