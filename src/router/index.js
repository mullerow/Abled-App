import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import createPoiView from '@/views/createPoiView.vue'
import favoritePoiView from '@/views/favoritePoiView.vue'
import accountView from '@/views/accountView.vue'
import searchPoisView from '@/views/searchPoisView.vue'
import ownPoisView from '@/views/ownPoisView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createpoi',
      name: 'createpoi',
      component: createPoiView
    },
    {
      path: '/favoritepois',
      name: 'favoritepois',
      component: favoritePoiView
    },
    {
      path: '/account',
      name: 'account',
      component: accountView
    },
    {
      path: '/searchPois',
      name: 'searchPois',
      component: searchPoisView
    },
    {
      path: '/ownPois',
      name: 'ownPois',
      component: ownPoisView
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(from)
  document.title = to.name
  next()
})

export default router
