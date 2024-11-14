<template>
    <div v-if="isPopupOpen" @click="close" class="popup-wrapper">
        <div class="popup">
            <div class="popup-content">
                <button @click="close" class="button round">
                    <img src="../assets/images/close.svg" alt="">
                </button>
                <slot name="title"></slot>
                <slot name="content"></slot>
                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue';
    import { usePopupStore } from '@/store/popup';

    const popupStore = usePopupStore();

    // console.log(popupStore.getIsPopupOpen.isOpen);
    
    const isPopupOpen = false

    
</script>