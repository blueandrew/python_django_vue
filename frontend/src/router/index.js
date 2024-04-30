import { createRouter, createWebHistory } from 'vue-router'
import Error404View from '../views/page/Error404View.vue' 
import HomeView from '../views/page/HomeView.vue'
import TestView from '../views/page/TestView.vue'
import DetailedView from '../views/page/DetailedView.vue'
import DrawWorksView from '../views/page/DrawWorksView.vue'
import PlayWorksView from '../views/page/PlayWorksView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: HomeView
  },
  {
    path: '/testPage',
    name: 'testPage',
    meta: {
      title: 'Test page',
    },
    component: TestView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: 'NotFound',
    },
    component: Error404View
  },
  {
    path: '/detailed/:id',
    name: 'detailed',
    meta: {
      title: 'Detailed',
    },
    component: DetailedView,
    beforeEnter: (to, from, next) => {
      const id = parseInt(to.params.id);
      console.log(id)
      if (id >= 1 && id <= 10) {
        // 如果 id 在範圍內，允許路由跳轉
        next();
      } else {
        // 如果 id 不在範圍內，導向到其他頁面
        next('/NotFound');
      }
    },
  },
  {
    path: '/drawWorks',
    name: 'drawWorks',
    meta: {
      title: 'Draw Works',
    },
    component: DrawWorksView
  },
  {
    path: '/playWorks',
    name: 'playWorks',
    meta: {
      title: 'Play Works',
    },
    component: PlayWorksView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
