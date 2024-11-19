<template>
  <main>
    <section class="note-section">
      <div class="notes">
        <NoteComponent 
          v-for="(note, index) in getNotes"
          :key="note.id"
          :data="note"
        />
      </div>
      <ButtonComponent class="round addNote" @click="addNote">
        <AddNotesIcon />
      </ButtonComponent>
    </section>
  </main>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import { auth } from '@/utils/api'
import { getAll , addNew } from '@/utils/notesApi';
import ButtonComponent from '@/components/ButtonComponent.vue';
import AddNotesIcon from '@/assets/svg-components/AddNotesIcon.vue';
import NoteComponent from '@/components/NoteComponent.vue';
import { useNotesStore } from '@/store/notes';

onMounted(async () => {
  await auth()
  await getAll()
})

const notesStore = useNotesStore()

const addNote = async () => {
  console.log(123);
}

const getNotes = computed(() => {
  console.log(notesStore.getNotes, 111);
  
  return notesStore.getNotes
})

// console.log(notesStore.getNotes);

</script>
<style scoped>
.note-section{
  padding: 40px 0;
  min-height: calc(100svh - var(--navbar-height));
  .addNote{
    position: fixed;
    right: 15px;
    bottom: 40px;
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.60);
    z-index: 3;
  }
  .notes{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
  @media  (max-width: 767px) {
    .notes{
      grid-template-columns: 1fr;
    }
  }
}
</style>
