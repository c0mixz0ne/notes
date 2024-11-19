<template>
  <div class="container">
    <slot> Данные не получены </slot>
  </div>
</template>

<style scoped>
.container {
  width: auto;
  margin: 0 auto;
  max-width: 1760px;
  padding: 0 80px;
  @media (max-width: 997px) {
    padding: 0 20px;
  }
}
</style>
