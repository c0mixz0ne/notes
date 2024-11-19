<template>
  <div class="input">
    <label :for="id"> {{ title }} </label>
    <div class="input-wrapper">
      <textarea
        :id="id"
        :class="{ error: errorMessage }"
        :placeholder="placeholder"
        type="text"
        :value="inputValue"
        :maxlength="maxLength"
        @input="handler"
      ></textarea>
    </div>
    <div class="input-service">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="maxLength" class="max-length">{{ currentLength }}/{{ maxLength }}</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'Введите значение',
  },
  placeholder: {
    type: String,
    default: 'Введите значение',
  },
  inputValue: {
    type: String,
  },
  errorMessage: {
    type: String,
    default: 'Не правильно заполненные данные',
  },
  maxLength: {
    type: Number,
  },
  id: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['updateInput'])

const handler = (e) => {
  emits('updateInput', e.target.value)
}

computed(() => {
  return props.errorMessage.length
})

const currentLength = computed(() => {
  return props.inputValue.length
})
</script>
<style lang="less" scoped>
@import '../assets/text.less';
.input {
  margin-bottom: 24px;
  label,
  textarea {
    display: block;
  }

  label {
    padding: 0 24px;
    margin-bottom: 8px;
    .text-small();
    color: var(--gray);
  }

  textarea {
    background-color: var(--white);
    width: 100%;
    border: 2px solid transparent;
    .text-small();
    padding: 22px 28px;
    border-radius: 36px;
    outline: none;
    margin-bottom: 10px;
    min-height: 200px;
    resize: none;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    &.error {
      &:hover,
      &:focus {
        border-color: var(--red);
      }
    }

    &::placeholder {
      color: var(--gray);
    }

    &:hover,
    &:focus {
      border-color: var(--green-light);
      transition: border-color ease 0.2s;
    }
  }

  .input-service {
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    .error-message {
      color: var(--red);
      .text-small();
    }
    .max-length {
      margin-left: auto;
      color: var(--gray);
      .text-small();
    }
  }

  .input-wrapper {
    position: relative;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: transparent;
      border: none;
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      padding: 0;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    margin-bottom: 16px;
  }
}
</style>
