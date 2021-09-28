import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Stores from '../views/Stores.vue'
import Services from '../views/Services.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import PurchaseDetail from '../views/PurchaseDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/services-detail',
    name: 'ServiceDetail',
    component: ServiceDetail,
  },
  {
    path: '/purchase-detail',
    name: 'PurchaseDetail',
    component: PurchaseDetail,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userString = localStorage.getItem("user");
  if ((to.name === 'Home' || to.name === 'Register') && userString) {
    next({ name: 'Stores' })
  } else if ((to.name === 'Stores') && !userString) {
    console.log("go login")
    next({ name: 'Home' })
  }
  else next()
})
export default router
