import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '*',
    component: () => import('@/views/NotFoundComponent.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/view',
    name: 'View',
    props: (route) => ({ id: route.query.id }),
    component: () => import('@/views/View.vue')
  },
  {
    path: '/webpage',
    name: 'Webpage',
    props: (route) => ({ id: route.query.id }),
    component: () => import('@/views/Webpage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/our_team',
    name: 'OurTeam',
    component: () => import('@/views/OurTeam.vue')
  },
  {
    path: '/news',
    props: { type: "news" },
    component: () => import('@/views/ViewList.vue')
  },
  {
    path: '/research',
    props: { type: "research" },
    component: () => import('@/views/ViewList.vue')
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('@/views/Board.vue')
  },
  {
    path: '/issue',
    name: 'Issue',
    component: () => import('@/views/Issue.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/Admin.vue'),

    children: [
      {
        path: 'manage',
        meta: {
          requireAuth: true
        },
        props: (route) => ({ type_name: route.query.type_name }),
        component: () => import('@/views/Manage.vue')
      },
      {
        path: 'image_manage',
        meta: {
          requireAuth: true
        },
        component: () => import('@/views/ImageManage.vue')
      },
      {
        path: 'article',
        meta: {
          requireAuth: true
        },
        props: (route) => ({ id: route.query.id }),
        component: () => import('@/views/Article.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
