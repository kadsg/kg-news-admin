import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Summary from '@/views/news/summary/index.vue'
import Detail from '@/views/news/detail/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/tag',
    component: Layout,
    redirect: '/tag',
    children: [{
      path: '/tag',
      name: 'Tag',
      component: () => import('@/views/management/tag/index'),
      meta: { title: '新闻标签', icon: 'el-icon-notebook-1' }
    }]
  },

  {
    path: '/role',
    component: Layout,
    redirect: '/role',
    children: [{
      path: '/role',
      name: 'Role',
      component: () => import('@/views/management/role/index'),
      meta: { title: '系统角色', icon: 'form' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: '/user',
      name: 'User',
      component: () => import('@/views/management/user/index.vue'),
      meta: { title: '用户管理', icon: 'el-icon-s-custom' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    children: [{
      path: '/news',
      name: 'News',
      component: () => import('@/views/news/index'),
      meta: { title: '新闻列表', icon: 'el-icon-news' }
    }]
  },

  {
    path: '/news/query',
    component: Layout,
    redirect: '/news/query',
    children: [{
      path: '/news/query',
      name: 'NewsQuery',
      component: () => import('@/views/news/query.vue'),
      meta: { title: '新闻检索', icon: 'el-icon-search' }
    }]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account',
    children: [{
      path: '/account',
      name: 'Account',
      component: () => import('@/views/center/index'),
      meta: { title: '个人中心', icon: 'user' }
    }]
  },

  {
    path: '/summary/:id',
    component: Layout,
    redirect: '/summary/:id',
    children: [
      {
        path: '/summary/:id',
        name: 'Summary',
        component: Summary,
        hidden: true
      }
    ]
  },

  {
    path: '/detail/:id',
    component: Layout,
    redirect: '/detail/:id',
    children: [
      {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
        hidden: true
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
