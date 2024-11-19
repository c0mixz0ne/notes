<template>
  <div class="user" @click="logoutToggler">
    <div class="user-email"> {{ email }} </div>
    <div class="user-image">
      <img src="../assets/images/user.svg" alt="Пользователь" />
    </div>
    <div @click.stop class="user-menu" v-if="isLogout">
      <LinkComponent @click="logoutHandler">
          Выйти
      </LinkComponent>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LinkComponent from './LinkComponent.vue';
import { logout } from '@/utils/api';
import router from '@/router';
const props = defineProps({
  email: {
    type: String,
    required: true
  }
})

const isLogout = ref(false)

const logoutToggler = () => {  
  isLogout.value = !isLogout.value
}

const logoutHandler = () => {
  logoutToggler()
  logout()
  router.push('/')
}

const handleClickOutside = (event) => {
  const userElement = document.querySelector('.user');
  const userMenuElement = document.querySelector('.user-menu');
  
  if (userElement && !userElement.contains(event.target) && 
      userMenuElement && !userMenuElement.contains(event.target)) {
    isLogout.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
})

</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  .user-email {
    margin-right: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 215px;
    @media (max-width: 767px){
      max-width: 90px;
    }
    @media (max-width: 359px){
      max-width: 160px;
    }
  }
  .user-image {
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background-color: var(--dark-middle);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-menu{
    position: absolute;
    background-color: var(--dark-middle);
    padding: 40px;
    border-radius: 12px;
    right: 0px;
    top:80px;
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.60);
    z-index: 2;
    :after{
      background-color: var(--dark-middle);
      position: absolute;
      content: '';
      display: block;
      width: 18px;
      height: 18px;
      right: 20px;
      top: -9px;
      transform: rotateZ(45deg);
    }
  }
}
</style>
