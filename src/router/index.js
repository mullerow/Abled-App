import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import registerUserView from '@/views/AccountViews/registerUserView.vue'
import prioView from '@/views/AccountViews/prioView.vue'
import newPoiCategorieView from '@/views/NewPoiViews/newPOICategoriesView.vue'
import newPoiLocationSelectionView from '@/views/NewPoiViews/newPOILocationSelectionView.vue'
import newPoiOptionalCategorieView from '@/views/NewPoiViews/newPOIOptionalCategoriesView.vue'
import newPoiAddressInputView from '@/views/NewPoiViews/newPOIAdressInputView.vue'
import newPoiInfoInputView from '@/views/NewPoiViews/newPOIInfoInputView.vue'
import favoritePoiView from '@/views/FavouritesViews/favoritePoiView.vue'
import favoriteMapView from '@/views/FavouritesViews/favoriteMapView.vue'
import favoriteInfoView from '@/views/FavouritesViews/favoriteInfoView.vue'
import accountView from '@/views/AccountViews/accountView.vue'
import ownPoiView from '@/views/OwnPoiViews/ownPoisView.vue'
import ownPoiMapView from '@/views/OwnPoiViews/ownPoiMapView.vue'
import ownPoiInfoView from '@/views/OwnPoiViews/ownPoiInfoView.vue'
import searchPoiView from '@/views/SearchViews/searchPoisView.vue'
import searchCategorieView from '@/views/SearchViews/searchCategoriesView.vue'
import searchOptionalCategorieView from '@/views/SearchViews/searchOptionalCategoriesView.vue'
import searchResultlistView from '@/views/SearchViews/searchResultlistView.vue'
import searchResultmapView from '@/views/SearchViews/searchResultmapView.vue'
import infoPoiView from '@/views/InfoPOIViews/infoPOIView.vue'
import infoPoiCommentView from '@/views/InfoPOIViews/infoPOICommentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: registerUserView
    },
    {
      path: '/prio',
      name: 'prio',
      component: prioView
    },
    {
      path: '/newpoicategorie',
      name: 'newpoicategorie',
      component: newPoiCategorieView
    },
    {
      path: '/newpoioptionalcategorie',
      name: 'newpoioptionalcategorie',
      component: newPoiOptionalCategorieView
    },
    {
      path: '/newpoilocationselection',
      name: 'newpoilocationselection',
      component: newPoiLocationSelectionView
    },
    {
      path: '/newpoiaddressinput',
      name: 'newpoiaddressinput',
      component: newPoiAddressInputView
    },
    {
      path: '/newpoiinfoinput',
      name: 'newpoiinfoinput',
      component: newPoiInfoInputView
    },
    {
      path: '/favoritepoi',
      name: 'favoritepoi',
      component: favoritePoiView
    },
    {
      path: '/favoritemap',
      name: 'favoritemap',
      component: favoriteMapView
    },
    {
      path: '/favoritepoiinfo',
      name: 'favoritepoiinfo',
      component: favoriteInfoView
    },
    {
      path: '/account',
      name: 'account',
      component: accountView
    },
    {
      path: '/searchpoi',
      name: 'searchpoi',
      component: searchPoiView
    },
    {
      path: '/ownpoi',
      name: 'ownpoi',
      component: ownPoiView
    },
    {
      path: '/ownpoimap',
      name: 'ownpoimap',
      component: ownPoiMapView
    },
    {
      path: '/ownpoiinfo',
      name: 'ownpoiinfo',
      component: ownPoiInfoView
    },
    {
      path: '/searchcategorie',
      name: 'searchcategorie',
      component: searchCategorieView
    },
    {
      path: '/searchoptionalcategorie',
      name: 'searchoptionalcategorie',
      component: searchOptionalCategorieView
    },
    {
      path: '/searchresultlist',
      name: 'searchresultlist',
      component: searchResultlistView
    },
    {
      path: '/searchresultmap',
      name: 'searchresultmap',
      component: searchResultmapView
    },
    {
      path: '/infopoi',
      name: 'infopoi',
      component: infoPoiView
    },
    {
      path: '/infopoicomment',
      name: 'infopoicomment',
      component: infoPoiCommentView
    }
  ]
})

// verwende die namen der Views für die title anzeige im browser
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

export default router
