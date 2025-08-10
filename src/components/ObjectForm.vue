<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit Object' : 'Create Object' }}</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Name" class="input mb-2" />
      <input v-model="color" placeholder="Color" class="input mb-2" />
      <input v-model="capacity" placeholder="Capacity" class="input mb-2" />
      <button class="btn" type="submit">{{ isEdit ? 'Update' : 'Submit' }}</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      color: '',
      capacity: '',
      error: '',
      isEdit: false,
      objectId: null,
    }
  },
  methods: {
    async fetchObject(id) {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`/api/objects/${id}`, {
        headers: { 'X-User-Name': user?.username }
      });
      if (res.ok) {
        const data = await res.json();
        this.name = data.name || '';
        this.color = data.data?.color || '';
        this.capacity = data.data?.capacity || '';
      } else {
        this.error = 'Failed to fetch object data';
      }
    },
    async submitForm() {
      if (!this.name || !this.capacity) {
        this.error = 'Name and Capacity are required';
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const method = this.isEdit ? 'PATCH' : 'POST';
      const url = this.isEdit ? `/api/objects/${this.objectId}` : '/api/objects';

      const body = {
        name: this.name,
        data: {
          color: this.color,
          capacity: this.capacity
        }
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-User-Name': user?.username
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const responseData = await res.json();
        this.$router.push(`/objects/${responseData.id || this.objectId}`);
      } else {
        const text = await res.text();
        this.error = 'Error saving object: ' + text;
      }
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.objectId = id;
      this.fetchObject(id);
    }
  }
}
</script>
