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

onMounted(() => (document.body.style.overflow = 'hidden'))

onUnmounted(() => (document.body.style.overflow = 'auto'))
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
  overflow: auto;
  z-index: 4;
  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width: 780px;
    width: calc(100% - 80px);
    background-color: var(--dark-middle);
    border-radius: 40px;
    padding: 80px;
    z-index: 3;

    :deep(.popup-title) {
      .h2();
      margin-bottom: 40px;
    }

    :deep(.popup-form) {
      margin-bottom: 40px;
      &:last-child {
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
        margin: 0 auto;
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
    @media (max-width: 767px) {
      padding: 56px;
    }
    @media (max-width: 575px) {
      :deep(.popup-title) {
        .h2mob();
        margin-bottom: 28px;
        padding-right: 56px;
      }
      :deep(.popup-form) {
        margin-bottom: 28px;
      }
      :deep(.popup-actions) {
        flex-direction: column;
        button {
          width: 100%;
          order: 1;
          span {
            width: 100%;
            text-align: center;
          }
        }
        .popup-registration {
          text-align: center;
          margin-top: 12px;
          order: 2;
          span {
            .text-small-mob();
          }
          .link {
            .text-small-bold-mob();
          }
        }
      }
      padding: 16px;
      width: 100%;
      padding-top: 42px;
      padding-bottom: 42px;
      top: 0;
      left: 0;
      transform: unset;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100%;
    }
  }
}
</style>
