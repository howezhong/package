const PCRouter = [
  {
    path: '/pc',
    redirect: '/pc/digital-roll',
    component: () => import('@/views/pc/Home.vue'),
    children: [
      {
        path: '/pc/digital-roll',
        name: 'digital-roll',
        meta: {
          title: '数字滚动'
        },
        component: () => import('@@/digitalRoll')
      }, {
        path: '/pc/lantern',
        name: 'lantern',
        meta: {
          title: '走马灯'
        },
        component: () => import('@@/lantern')
      }, {
        path: '/pc/pagination',
        name: 'pagination',
        meta: {
          title: '分页'
        },
        component: () => import('@/example/Page.vue')
      }, {
        path: '/pc/swipe',
        name: 'swipe',
        meta: {
          title: '轮播图'
        }
      }, {
        path: '/pc/sidebar',
        name: 'sidebar',
        meta: {
          title: '侧边栏'
        }
      }, {
        path: '/pc/dialog',
        name: 'dialog',
        meta: {
          title: '弹窗'
        },
        component: () => import('@/example/Dialog.vue')
      }, {
        path: '/pc/select',
        name: 'select',
        meta: {
          title: '下拉选择器'
        }
      }
    ]
  }
]

export default PCRouter
