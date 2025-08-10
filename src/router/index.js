import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ObjectList from '../components/ObjectList.vue'
import ObjectForm from '../components/ObjectForm.vue'
import ObjectDetail from '../components/ObjectDetail.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/objects',
    component: ObjectList,
    meta: { requiresAuth: true },
  },
  {
    path: '/objects/create',
    component: ObjectForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/objects/:id',
    component: ObjectDetail,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    next('/objects');
  } else {
    next();
  }
});

export default router;