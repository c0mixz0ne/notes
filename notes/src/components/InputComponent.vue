<template>
  <div class="input-wrapper">
    <label for="email"> {{ title }} </label>
    <input
      :class="{ error: errorMessage }"
      :placeholder="placeholder"
      :id="id"
      :type="inputType"
      :autocomplete="autocomplete"
      :value="inputValue"
      @input="handler"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  inputValue: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['updateInput'])

const handler = (e) => {
  emits('updateInput', e.target.value)
}
</script>
<style lang="less" scoped>
@import '../assets/text.less';

.input-wrapper {
  margin-bottom: 24px;
  label,
  input {
    display: block;
  }

  label {
    padding: 0 24px;
    margin-bottom: 8px;
    .text-small();
    color: var(--gray);
  }

  input {
    background-color: var(--white);
    width: 100%;
    border: 2px solid transparent;
    .text-small();
    padding: 22px 28px;
    border-radius: 36px;
    outline: none;
    margin-bottom: 10px;
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

  .error-message {
    color: var(--red);
    padding: 0 25px;
  }
}
</style>
