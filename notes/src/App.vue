<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/HeaderComponent.vue'
import Container from '@/components/layout/ContainerComponent.vue'
</script>

<template>
  <Container>
    <Header />
    <RouterView />
  </Container>
</template>
