<template>
  <main>
    <section class="main-section">
      <div class="main-content">
        <h1>
          <span>Мои</span>
          <span>заметки</span>
        </h1>
        <h3>
          Не забывай о важном, храни его в облаке.
        </h3>
      </div>
      <div class="main-image">
        <img src="../assets/images/main.svg" alt="Главная картинка">
      </div>
    </section>
  </main>
  <PopupComponent>
    <template #title>
      <div class="popup-title">
        Вход в ваш аккаунт
      </div>
    </template>
    <template #content>
      <form class="popup-form">
        <label for="email">Email</label>
        <input placeholder="Введите значение" id="email" type="text" autocomplete>

        <label for="password">Password</label>
        <input placeholder="Введите пароль" id="password" type="password" autocomplete>
      </form>
    </template>
    <template #action>
      <div class="popup-actions">
        <div class="popup-registration">
          <span>У вас нет аккаунта?</span>
          <a class="link" href="">Зарегистрируйтесь</a>
        </div>
        <button class="button">Войти</button>
      </div>
    </template>
  </PopupComponent>
</template>
<script setup>
    import PopupComponent from '@/components/PopupComponent.vue';
</script>