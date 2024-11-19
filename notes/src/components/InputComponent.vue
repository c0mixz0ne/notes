<template>
  <div class="input">
    <label :for="id"> {{ title }} </label>
    <div class="input-wrapper">
      <input
        :class="{ error: errorMessage }"
        :placeholder="placeholder"
        :id="id"
        :type="getType"
        :autocomplete="autocomplete"
        :value="inputValue"
        @input="handler"
      />
      <button @click="toggle" v-if="inputType === 'password'">
        <ShowPassIcon v-if="inputType === 'password' && !isVisible" />
        <HidePassIcon v-if="inputType === 'password' && isVisible"/>
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import ShowPassIcon from '@/assets/svg-components/ShowPassIcon.vue';
import HidePassIcon from '@/assets/svg-components/HidePassIcon.vue';

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

const isVisible = ref(false)

const toggle = () => {
  isVisible.value = !isVisible.value
}

const getType = computed(()=> {
  return props.inputType === 'password' ?
  isVisible.value ? 'text' : 'password' :
  'text'
})

</script>
<style lang="less" scoped>
@import '../assets/text.less';

.input{
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

  .input-wrapper{
    position: relative;
    button{
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
  &:last-child{
    margin-bottom: 0;
  }
  @media(max-width: 575px){
    margin-bottom: 16px;
  }
}
</style>
