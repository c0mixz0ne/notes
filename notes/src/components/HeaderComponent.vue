<template>
<header class="header">
    <img class="logo" src="../assets/images/logo.svg" alt="Логотип">
    <img class="logo-mob" src="../assets/images/mob-logo.svg" alt="Логотип">
      <nav>
          <button
          @click="openPopup('login')"
          v-if="!isAuth" 
          class="button"
          >
            <img src="../assets/images/login.svg" alt="Иконка Входа">
            Вход
          </button>
          <div
          v-if="isAuth" 
           class="user">
            <div class="user-email">login@email.ru</div>
            <div class="user-image">
              <img src="../assets/images/user.svg" alt="Пользователь">
            </div>
          </div>
      </nav>
</header>
</template>
<script setup>
  import { usePopupStore } from '@/store/popup';

  const popupStore = usePopupStore();

  const openPopup = (type) => {
    popupStore.setIsPopupOpen({ type, status: true });
    console.log(popupStore);

    console.log(popupStore.getIsPopupOpen.isOpen);
    
  }
</script>
<style scoped>

</style>