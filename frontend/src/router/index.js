import { createRouter, createWebHistory } from 'vue-router'
import Error404View from '../views/page/Error404View.vue' 
import HomeView from '../views/page/HomeView.vue'
import TestView from '../views/page/TestView.vue'
import DetailedView from '../views/page/DetailedView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/testPage',
    name: 'testPage',
    component: TestView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404View
  },
  {
    path: '/detailed/:id',
    name: 'detailed',
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
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
