import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')


router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')
  
    if (!user && (to.path !== '/login' && to.path !== '/register')) {
      // If not logged in and trying to access protected routes, redirect to login
      next('/login')
    } else if (user && (to.path === '/login' || to.path === '/register')) {
      // If logged in and trying to access login/register, redirect to objects list
      next('/objects')
    } else {
      next()
    }
  })