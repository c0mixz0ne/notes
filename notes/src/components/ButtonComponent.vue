<template>
  <button class="button" @click="$emit('action')">
    <slot> Кнопка </slot>
  </button>
</template>
<script setup></script>
<style lang="less" scoped>
@import '../assets/text.less';

.button {
  background-color: var(--green-light);
  border: none;
  color: var(--white);
  display: flex;
  align-items: center;
  border-radius: 32px;
  padding: 11px 24px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s ease;
  .text-normal();

  &.round {
    padding: 0;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin: 0;
    }
  }

  &.close-popup {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  :deep(.login) {
    margin-right: 11px;
  }

  &:hover {
    background-color: var(--green-middle);
  }

  &:active {
    background-color: var(--green-dark);
  }

  &:disabled {
    background-color: var(--gray);
    cursor: not-allowed;
  }
}
</style>
