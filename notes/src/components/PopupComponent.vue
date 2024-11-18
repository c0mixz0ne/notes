<template>
  <div v-if="isPopupOpen" class="popup-wrapper" @click="close">
    <div class="popup" @click.stop>
      <div class="popup-content">
        <ButtonComponent class="round close-popup" @click="close">
          <CrossIcon />
        </ButtonComponent>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <slot :isLoading="isLoading" name="action"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { usePopupStore } from '@/store/popup'
import CrossIcon from '@/assets/svg-components/CrossIcon.vue'

import ButtonComponent from './ButtonComponent.vue'

const emits = defineEmits(['close-popup'])

const popupStore = usePopupStore()

const popupIsOpen = popupStore.getIsPopupOpen

const isPopupOpen = computed(() => popupIsOpen.isOpen)

const isLoading = computed(() => popupStore.getIsLoading)

const close = () => {
  popupStore.setIsPopupOpen(null, false)
  emits('close-popup')
}

const overflowHidden = onMounted(() => document.body.style.overflow = 'hidden')

const overflowauto = onUnmounted(() => document.body.style.overflow = 'auto')
</script>
<style lang="less" scoped>
@import '../assets/text.less';

.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(var(--dark-middle-opacity), 0.7);
  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width: 780px;
    width: 100%;
    background-color: var(--dark-middle);
    border-radius: 40px;
    padding: 80px;

    :deep(.popup-title) {
      .h2();
      margin-bottom: 40px;
    }

    :deep(.popup-form) {
      margin-bottom: 40px;
      & :last-child {
        margin-bottom: 0;
      }
    }

    :deep(.popup-actions) {
      display: flex;
      align-items: center;
      .popup-registration {
        span {
          .text-small();
          color: var(--gray);
          margin-right: 5px;
        }
      }
      button {
        margin-left: auto;
      }
      .loader {
        border: 4px solid var(--white);
        border-top: 4px solid var(--green-light);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
      }
    }

    :deep(.popup-error) {
      color: var(--red);
      background-color: rgb(var(--red-opacity), 0.1);
      padding: 8px 20px;
      margin-top: 20px;
      border-radius: 24px;
      .text-small();
    }
  }
}
</style>
