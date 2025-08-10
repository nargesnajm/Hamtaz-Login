<template>
    <div class=" p-4 max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-8">Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" class="input mb-2" />
        <input v-model="password" type="password" placeholder="Password" class="input mb-2" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="input mb-2" />
        <button type="submit" class="btn mt-8">Register</button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
      <router-link to="/login" class="text-blue-500 underline mt-4 block">Already registered? Login</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        error: ''
      }
    },
    methods: {
      register() {
        if (!this.username || !this.password) {
          this.error = 'All fields required'
          return
        }
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match'
          return
        }
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.find(u => u.username === this.username)) {
          this.error = 'Username already exists'
          return
        }
        users.push({ username: this.username, password: this.password })
        localStorage.setItem('users', JSON.stringify(users))
        this.$router.push('/login')
      }
    }
  }
  </script>
  