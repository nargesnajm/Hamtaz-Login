<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Object List</h1>
    <router-link to="/objects/create" class="btn mb-8 inline-block">+ New Object</router-link>

    <div v-if="loading">Loading...</div>
    
    <div v-else-if="objects.length === 0">No objects found.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ObjectListItem
        v-for="obj in objects"
        :key="obj.id"
        :item="obj"
        @deleted="handleDeleted"
      />
    </div>
  </div>
</template>

<script>
import ObjectListItem from '../components/ObjectListItem.vue'

export default {
  components: { ObjectListItem },
  data() {
    return {
      objects: [],
      loading: false
    }
  },
  methods: {
    async fetchObjects() {
      this.loading = true
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const res = await fetch('/api/objects', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-User-Name': user?.username
          }
        })
        const data = await res.json()
        this.objects = data 
      } catch (error) {
        console.error('Failed to fetch objects:', error)
      } finally {
        this.loading = false
      }
    },

    handleDeleted(deletedId) {
      this.objects = this.objects.filter(obj => obj.id !== deletedId)
    }
  },
  mounted() {
    this.fetchObjects()
  }
}
</script>
