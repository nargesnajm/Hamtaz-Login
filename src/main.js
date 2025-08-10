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
    
      next('/login')
    } else if (user && (to.path === '/login' || to.path === '/register')) {
 
      next('/objects')
    } else {
      next()
    }
  })
