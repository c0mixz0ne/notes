<script setup>
  import { RouterLink } from 'vue-router';

  const modal = (e) => {
    console.log(e);
    
  }
</script>
<template>
<header class="header">
    <img src="../assets/images/logo.svg" alt="Логотип">
      <nav>
          <button
          @click="modal"
          class="button"
          aria-haspopup="dialog"
          aria-controls="login-modal"
          >
            <img src="../assets/images/login.svg" alt="Иконка Входа">
            Вход
          </button>
      </nav>
</header>
</template>
