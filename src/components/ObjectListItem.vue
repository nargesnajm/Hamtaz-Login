<template>
  <div class="border p-3 mb-3 rounded h-full flex flex-col justify-between">
    <p class="font-bold">{{ item.name || 'No title' }}</p>
    <p v-if="item.data?.color">Color: {{ item.data.color }}</p>
    <p v-if="item.data?.capacity">Capacity: {{ item.data.capacity }}</p>
    <div class="flex gap-2 mt-2 mx-auto">
      <router-link :to="'/objects/' + item.id" class="btn-sm w-20 h-10">View</router-link>
      <button class="btn-sm w-20 h-10" @click="remove">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    async remove() {
      if (!confirm('Are you sure?')) return;
      if ([1, 2, 3].includes(this.item.id)) {
    alert('This object cannot be deleted (reserved ID).');
    return;
  }


      const user = JSON.parse(localStorage.getItem('user'));

      try {
        const response = await fetch(`https://api.restful-api.dev/objects/${this.item.id}`, {
          method: 'DELETE',
          headers: { 'X-User-Name': user?.username }
        });

        if (!response.ok) {
          const errorText = await response.text();
          alert('Error deleting object: ' + errorText);
          return;
        }

        
        this.$emit('deleted', this.item.id);

      } catch (err) {
        alert('Network error, could not delete.');
        console.error(err);
      }
    }
  }
}
</script>
