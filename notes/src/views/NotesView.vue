<template>
  <button @click="logoutClick">
    logout
  </button>
</template>
<script setup>
import { onMounted } from 'vue';
import { login, auth, registration, logout } from '@/utils/api'
import router from '@/router';
onMounted(async () => {
  await auth()
})

const logoutClick = () => {
  logout()
  router.push('/')
}
</script>
<style scoped>
</style>
