<template>
  <main>
    <section class="note-section">
      <div class="notes">
        <NoteComponent v-for="note in getNotes" :key="note.id" :data="note" />
      </div>
      <PopupComponent
        v-if="popupIsOpen.type === 'note'"
        @close-popup="
          resetPopupFields(notesData),
          resetPopupErrors(notesData)
        "
      >
        <template #title>
          <div class="popup-title">
            {{ notesData.title }}
          </div>
        </template>
        <template #content>
          <form @submit.prevent class="popup-form">
            <InputComponent
              :title="notesData.inputs[0].title"
              :placeholder="notesData.inputs[0].placeholder"
              :input-value="notesData.inputs[0].value"
              :input-type="notesData.inputs[0].type"
              :error-message="notesData.inputs[0].error"
              :id="notesData.inputs[0].id"
              :autocomplete="notesData.inputs[0].autocomplete"
              :max-length="notesData.inputs[0].length"
              @updateInput="updateInputValue($event, 0, notesData)"
            />
            <TextAreaComponent
              :title="notesData.inputs[1].title"
              :placeholder="notesData.inputs[1].placeholder"
              :input-value="notesData.inputs[1].value"
              :error-message="notesData.inputs[1].error"
              :id="notesData.inputs[1].id"
              :autocomplete="notesData.inputs[1].autocomplete"
              :max-length="notesData.inputs[1].length"
              @updateInput="updateInputValue($event, 1, notesData)"
            />
          </form>
        </template>
        <template #action="{ isLoading }">
          <div class="popup-actions">
            <ButtonComponent :class="{ loading: isLoading }" @click="notesData.method">
              <span v-if="!isLoading">{{ notesData.button }}</span>
              <span v-if="isLoading" class="loader"></span>
            </ButtonComponent>
          </div>
          <div v-if="notesData.errorMessage" class="popup-error">{{ notesData.errorMessage }}</div>
        </template>
      </PopupComponent>
      <ButtonComponent class="round addNote" @click="openModal">
        <AddNotesIcon />
      </ButtonComponent>
    </section>
  </main>
</template>
<script setup>
import { onMounted, computed, reactive } from 'vue'
import { useNotesStore } from '@/store/notes'
import { usePopupStore } from '@/store/popup'
import { auth } from '@/utils/api'
import { getAll, addNew } from '@/utils/notesApi'
import validate from '@/utils/validate'
import ButtonComponent from '@/components/ButtonComponent.vue'
import AddNotesIcon from '@/assets/svg-components/AddNotesIcon.vue'
import NoteComponent from '@/components/NoteComponent.vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import TextAreaComponent from '@/components/TextAreaComponent.vue'

onMounted(async () => {
  await auth()
  await getAll()
})

const notesStore = useNotesStore()
const popupStore = usePopupStore()

const openModal = async () => {
  popupStore.setIsPopupOpen('note', true)
}

const getNotes = computed(() => {
  return notesStore.getNotes
})

const popupIsOpen = computed(() => popupStore.getIsPopupOpen)

const addNote = async () => {
  const [title, content] = notesData.inputs

  const note = { title: title.value, content: content.value }

  const titleError = validate('title', title.value)
  const contentError = validate('content', content.value)

  try {
    if (titleError || contentError) {
      notesData.inputs[0].error = titleError
      notesData.inputs[1].error = contentError
      return
    }

    resetPopupErrors(notesData)
    popupStore.setIsLoading(true)
    await addNew(note)
    popupStore.setIsLoading(false)

    popupStore.setIsPopupOpen(null, false)

    updateInputValue('', 0, notesData)
    updateInputValue('', 1, notesData)
  } catch (err) {
    notesData.errorMessage = err.response.data.message
    popupStore.setIsLoading(false)
  }
}

const notesData = reactive({
  title: 'Добавление заметки',
  button: 'Добавить',
  method: addNote,
  inputs: [
    {
      name: 'title',
      title: 'Название заметки',
      placeholder: 'Введите название',
      type: 'text',
      length: 100,
      value: '',
      error: '',
    },
    {
      name: 'content',
      title: 'Текст заметки',
      placeholder: 'Введите текст',
      type: 'text',
      length: 255,
      value: '',
      error: '',
      id: 'notes-text',
    },
  ],
  errorMessage: '',
})

const resetPopupFields = (popup) => {
  popup.inputs.forEach((input) => {
    input.value = ''
  })
}

const resetPopupErrors = (popup) => {
  popup.inputs.forEach((input) => {
    input.error = ''
  })
  popup.errorMessage = ''
}

const updateInputValue = (value, index, popup) => {
  popup.inputs[index].value = value
}
</script>
<style scoped>
.note-section {
  padding: 40px 0;
  min-height: calc(100svh - var(--navbar-height));
  .addNote {
    position: fixed;
    right: 15px;
    bottom: 40px;
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
    z-index: 3;
  }
  .notes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
  @media (max-width: 1365px) {
    .notes {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 767px) {
    .notes {
      grid-template-columns: 1fr;
    }
  }
}
</style>
