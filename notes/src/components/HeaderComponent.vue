<template>
  <header class="header">
    <LogoIcon />
    <LogoMobIcon />
    <nav>
      <ButtonComponent @click="openPopup('login')" v-if="!isAuth">
        <LoginIcon class="login" />
        Вход
      </ButtonComponent>
      <UserComponent v-if="isAuth" />
    </nav>
  </header>
</template>
<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/store/user'
import { usePopupStore } from '@/store/popup'
const authStore = useAuthStore()
const popupStore = usePopupStore()

import LogoIcon from '@/assets/svg-components/LogoIcon.vue'
import LogoMobIcon from '@/assets/svg-components/LogoMobIcon.vue'
import LoginIcon from '@/assets/svg-components/LoginIcon.vue'

import ButtonComponent from './ButtonComponent.vue'
import UserComponent from './UserComponent.vue'

const openPopup = (type) => {
  popupStore.setIsPopupOpen(type, true)
}

const isAuth = computed(() => { return authStore.getAuthUser.email})
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;

  .logo-mob {
    display: none;
  }

  @media screen and (max-width: 1365px) {
    padding: 20px 0;
  }

  @media screen and (max-width: 767px) {
    .logo {
      width: 154px;
    }
  }

  @media screen and (max-width: 359px) {
    .logo {
      display: none;
    }

    .logo-mob {
      display: block;
    }
  }
}
</style>
