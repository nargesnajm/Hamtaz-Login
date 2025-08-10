<template>
    <div class="p-4 max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" class="input mb-2 rounded-md border" />
        <input v-model="password" type="password" placeholder="Password" class="input mb-2" />
        <button type="submit" class="btn">Login</button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
      <router-link to="/register" class="text-blue-500 underline mt-4 block">No account? Register</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login() {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const found = users.find(u => u.username === this.username && u.password === this.password)
        if (found) {
          localStorage.setItem('user', JSON.stringify(found))
          this.$router.push('/objects')
        } else {
          this.error = 'Invalid credentials'
        }
      }
    }
  }
  </script>
  