<template>

  <div class="w-screen-90 h-screen  text-gray-900">
    <header class="bg-white shadow p-4 mb-6 gap-5 flex justify-between items-center ">
      <h1 class="text-2xl font-bold text-blue-600">Hamtaz App</h1>
      <div v-if="user" class="flex items-center gap-3">
        <span class="text-sm text-gray-700">
          Logged in as : <strong>{{ user.username }}</strong>
        </span>
        <button @click="logout" class="btn-sm m-4 bg-red-500 text-white hover:bg-red-600">Logout</button>
      </div>
    </header>

    <main class="container mx-auto px-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  watch: {
    
    '$route'() {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.user = null
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@import './assets/tailwind.css';
</style>
