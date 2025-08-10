<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Object Detail</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <p><b>ID : </b> {{ object.id }}</p>
        <p><b>Name : </b> {{ object.name }}</p>
        <pre class="mt-6 ltr">{{ object.data }}</pre>
        <div class="mt-4 w-20 h-10 mx-auto flex gap-2 mt-5">
          <router-link :to="'/objects/create?id=' + object.id" class="btn-sm mx-auto w-20 h-10 mt-3">Edit</router-link>
          <button class="btn-sm mx-auto w-20 h-10 " @click="remove">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { object: {}, loading: false }
    },
    methods: {
      async fetchDetail() {
        this.loading = true
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await fetch(`/api/objects/${this.$route.params.id}`, {
          headers: { 'X-User-Name': user?.username }
        })
        this.object = await res.json()
        this.loading = false
      },
      async remove() {
        if (!confirm('Are you sure?')) return
        const user = JSON.parse(localStorage.getItem('user'))
        await fetch(`https://restful-api.dev/objects/${this.object.id}`, {
          method: 'DELETE',
          headers: { 'X-User-Name': user?.username }
        })
        this.$router.push('/objects')
      }
    },
    mounted() {
      this.fetchDetail()
    }
  }
  </script>
  