<template>
  <main>
    <section class="main-section">
      <div class="main-content">
        <h1>
          <span>Мои</span>
          <span>заметки</span>
        </h1>
        <h3>Не забывай о важном, храни его в облаке.</h3>
      </div>
      <div class="main-image">
        <img src="../assets/images/main.svg" alt="Главная картинка" />
      </div>
    </section>
  </main>
  <PopupComponent
  v-if="popupIsOpen.type === loginData.name && !isAuth"
  @close-popup="resetPopupFields(loginData); resetPopupErrors(loginData)">
    <template #title>
      <div class="popup-title">
        {{ loginData.title }}
      </div>
    </template>
    <template #content>
      <form @submit.prevent class="popup-form">
        <InputComponent
          v-for="(input, index) in loginData.inputs"
          :key="input.title"
          :title="input.title"
          :placeholder="input.placeholder"
          :input-value="input.value"
          :input-type="input.type"
          :error-message="input.error"
          :id="input.id"
          :autocomplete="input.autocomplete"
          @updateInput="updateInputValue($event, index, loginData)"
        />
      </form>
    </template>
    <template #action="{ isLoading }">
      <div class="popup-actions">
        <div class="popup-registration">
          <span> {{ loginData.question }} </span>
          <LinkComponent @click="openPopup(registrationData)">
            {{ loginData.popupLinkName }}
          </LinkComponent>
        </div>
        <ButtonComponent :class="{ loading: isLoading }" @click="loginData.method">
          <span v-if="!isLoading">{{ loginData.button }}</span>
          <span v-if="isLoading" class="loader"></span>
        </ButtonComponent>
      </div>
      <div v-if="loginData.errorMessage" class="popup-error">{{ loginData.errorMessage }}</div>
    </template>
  </PopupComponent>
  <PopupComponent
  v-if="popupIsOpen.type === registrationData.name && !isAuth"
  @close-popup="resetPopupFields(registrationData); resetPopupErrors(registrationData)">
    <template #title>
      <div class="popup-title">
        {{ registrationData.title }}
      </div>
    </template>
    <template #content>
      <form @submit.prevent class="popup-form">
        <InputComponent
          v-for="(input, index) in registrationData.inputs"
          :key="input.title"
          :title="input.title"
          :placeholder="input.placeholder"
          :input-value="input.value"
          :input-type="input.type"
          :error-message="input.error"
          :id="input.id"
          :autocomplete="input.autocomplete"
          @updateInput="updateInputValue($event, index, registrationData)"
        />
      </form>
    </template>
    <template #action="{ isLoading }">
      <div class="popup-actions">
        <div class="popup-registration">
          <span> {{ registrationData.question }} </span>
          <LinkComponent @click="openPopup(loginData)">
            {{ registrationData.popupLinkName }}
          </LinkComponent>
        </div>
        <ButtonComponent :class="{ loading: isLoading }" @click="registrationData.method">
          <span v-if="!isLoading">{{ registrationData.button }}</span>
          <span v-if="isLoading" class="loader"></span>
        </ButtonComponent>
      </div>
      <div v-if="registrationData.errorMessage" class="popup-error">{{ registrationData.errorMessage }}</div>
    </template>
  </PopupComponent>
</template>
<script setup>
import { reactive, onMounted, computed } from 'vue'

import { usePopupStore } from '@/store/popup'
import { useAuthStore } from '@/store/user'

import router from '@/router'

import PopupComponent from '@/components/PopupComponent.vue'
import LinkComponent from '@/components/LinkComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'

import validate from '@/utils/validate'
import { login, auth, registration } from '@/utils/api'

const popupStore = usePopupStore()
const authStore = useAuthStore()

const toLogin = async () => {
  const [email, password] = loginData.inputs

  const data = {
    email: email.value.toLowerCase(),
    password: password.value,
  }

  const emailError = validate('email', data.email)
  const passwordError = validate('password', data.password)

  try {
    if (emailError || passwordError) {
      loginData.inputs[0].error = emailError
      loginData.inputs[1].error = passwordError
      return
    }

    resetPopupErrors(loginData)
    popupStore.setIsLoading(true)
    await login(data)
    popupStore.setIsLoading(false)
    popupStore.setIsPopupOpen(null, false)
    router.push('/notes')
  } catch (err) {
    loginData.errorMessage = err.response.data.message
    popupStore.setIsLoading(false)
  }
}

const toRegistration = async () => {
  const [email, password, secondPassword] = registrationData.inputs

  const data = {
    email: email.value.toLowerCase(),
    password: password.value,
    confirm_password: secondPassword.value
  }

  const emailError = validate('email', email.value)
  const passwordError = validate('password', password.value)
  const confirmError = validate('confirm', secondPassword.value)

  try {
    if (emailError || passwordError || confirmError) {
      registrationData.inputs[0].error = emailError
      registrationData.inputs[1].error = passwordError
      registrationData.inputs[2].error = confirmError
      return
    }
    resetPopupErrors(registrationData)
    popupStore.setIsLoading(true)
    await registration(data)
    popupStore.setIsLoading(false)
    popupStore.setIsPopupOpen(null, false)
    router.push('/notes')
    } catch (err) {
      registrationData.errorMessage = err.response.data.message
      popupStore.setIsLoading(false)
    }
}

const isAuth = computed(() => { return authStore.getAuthUser.email })

const popupIsOpen = computed(() => popupStore.getIsPopupOpen)

const openPopup = (popup) => {
  popupStore.setIsPopupOpen(popup.name, true)
  resetPopupErrors(popup)
  resetPopupFields(popup)
}

const updateInputValue = (value, index, popup) => {
  popup.inputs[index].value = value
}

const loginData = reactive({
  name: 'login',
  title: 'Вход в ваш аккаунт',
  inputs: [
    {
      title: 'Email',
      placeholder: 'Введите значение',
      type: 'text',
      value: '',
      isValid: true,
      error: '',
      id: 'email-login'
    },
    {
      title: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password',
      value: '',
      isValid: true,
      error: '',
      id: 'password-login',
    },
  ],
  question: 'У вас нет аккаунта?',
  popupLink: 'registration',
  popupLinkName: 'Зарегистрируйтесь',
  button: 'Войти',
  method: toLogin,
  errorMessage: '',
})

const registrationData = reactive({
  name: 'registration',
  title: 'Регистрация',
  inputs: [
    {
      title: 'Email',
      placeholder: 'Введите Email',
      type: 'text',
      value: '',
      error: '',
      id: 'email-registration',
    },
    {
      title: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password',
      value: '',
      error: '',
      id: 'password-registration',
    },
    {
      title: 'Пароль ещё раз',
      placeholder: 'Введите пароль',
      type: 'password',
      value: '',
      error: '',
      id: 'second-password-registration'
    },
  ],
  question: 'У вас есть аккаунт?',
  popupLink: 'login',
  popupLinkName: 'Войдите',
  button: 'Зарегестрироваться',
  method: toRegistration,
  errorMessage: '',
})

const resetPopupFields = (popup) => {
  popup.inputs.forEach(input => {
    input.value = ''
  });
}

const resetPopupErrors = (popup) => {
  popup.inputs.forEach(input => {
    input.error = ''
  });
  popup.errorMessage = ''
}

onMounted(async () => {
  await auth()
})
</script>
<style lang="less" scoped>
@import '../assets/text.less';

.main-section {
  display: flex;
  justify-content: space-between;
  min-height: calc(100svh - var(--navbar-height));

  .main-image {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 897px;

    img {
      max-width: 100%;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-top: 236px;

    h1 {
      .h1();
      color: var(--white);
      margin: 0;

      span {
        display: block;
      }
    }

    h3 {
      .h3();
      color: var(--gray);
      margin: 0;
    }
  }

  @media (max-width: 1365px) {
    .main-content {
      padding-top: 106px;
      margin: 0;
    }

    .main-image {
      width: 100%;
      max-width: 627px;
    }
  }

  @media (max-width: 997px) {
    flex-direction: column;

    .main-content {
      gap: 20px;
      padding-top: 40px;

      h1,
      h3 {
        text-align: center;
      }
    }

    .main-image {
      max-width: 100%;

      img {
        margin: 0 auto;
      }
    }
  }

  @media  (max-width: 767px) {
    .main-content {
      h3{
        .h3-mob()
      }
      padding-top: 20px;
    }
  }
}
</style>
