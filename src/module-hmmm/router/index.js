import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [{
    path: '/companys',
    component: Layout,
    redirect: 'noredirect',
    name: 'companys',
    meta: {
      title: '企业管理',
      icon: 'component'
    },
    children: [{
      path: 'list',
      component: _import('hmmm/pages/companys'),
      name: 'companys-list',
      meta: {
        title: '企业',
        noCache: true
      }
    }]
  },
  {
    path: '/questions',
    component: Layout,
    redirect: 'noredirect',
    name: 'questions',
    meta: {
      title: '题库',
      icon: 'component'
    },
    children: [{
        path: 'list',
        component: _import('hmmm/pages/questions'),
        name: 'questions-list',
        meta: {
          title: '基础题库',
          noCache: true
        }
      },
      {
        path: 'choice',
        component: _import('hmmm/pages/questions-choice'),
        name: 'questions-choice',
        meta: {
          title: '精选题库',
          noCache: true
        }
      },
      {
        path: 'new',
        component: _import('hmmm/pages/questions-new'),
        name: 'questions-new',
        meta: {
          title: '试题录入',
          noCache: true
        }
      },
      {
        path: 'randoms',
        component: _import('hmmm/pages/questions-randoms'),
        name: 'questions-randoms',
        meta: {
          title: '组题列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/subjects',
    component: Layout,
    redirect: 'noredirect',
    name: 'subjects',
    meta: {
      title: '学科管理',
      icon: 'component'
    },
    children: [{
        path: 'list',
        component: _import('hmmm/pages/subjects'),
        name: 'subjects-list',
        meta: {
          title: '学科',
          noCache: true
        }
      },
      {
        path: 'directorys',
        component: _import('hmmm/pages/directorys'),
        name: 'subjects-directorys',
        meta: {
          title: '目录',
          noCache: true
        }
      },
      {
        path: 'tags',
        component: _import('hmmm/pages/tags'),
        name: 'subjects-tags',
<<<<<<< HEAD
        meta: { title: '标签', noCache: true }
      },
=======
        meta: {
          title: '标签',
          noCache: true
        }
      }
>>>>>>> 66c2ff876f4730dd8e17b01ddeaddda6a4467887
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: 'noredirect',
    name: 'articles',
    meta: {
      title: '面试技巧',
      icon: 'component'
    },
    children: [{
        path: 'list',
        component: _import('hmmm/pages/articles'),
        name: 'articles-list',
        meta: {
          title: '面试技巧文章',
          noCache: true
        }
      },
      { // 新增页面
        path: 'newly',
        component: _import('hmmm/pages/newly-increased'),
        name: 'newly-list',
        meta: {
          title: '新增技巧',
          noCache: true
        },
        hidden: true
      },
      { // 修改
        path: 'newly/:articleId',
        component: _import('hmmm/pages/newly-increased'),
        hidden: true
      }
    ]
  }
]
