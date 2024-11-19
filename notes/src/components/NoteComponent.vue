<template>
    <div class="note-wrapper">
        <div class="note">
            <div class="title-wrrapper">
                <span class="title">
                    {{ data.title }}
                </span>
            </div>
            <div class="content"> {{ data.content }} </div>
            <div class="actions">
                <button @click="deleteNote(data.id)">
                    <CrossNoteIcon />
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import CrossNoteIcon from '@/assets/svg-components/CrossNoteIcon.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const deleteNote = (id) => {
    console.log(id);
}
</script>
<style lang="less" scoped>
@import '../assets/text.less';

.note-wrapper {
    .note {
        max-height: 480px;
        overflow: hidden;
        box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.40);

        .title {
            .h4();
            padding: 20px 56px 20px 28px;
            position: relative;
            background-color: var(--green-light);
            display: flex;
            align-items: center;
            border-top-left-radius: 12px;

            &::after {
                content: "";
                border-top: 20px solid var(--dark);
                border-right: 20px solid var(--dark);
                border-bottom: 20px solid var(--green);
                border-left: 20px solid var(--green);
                position: absolute;
                top: 0;
                right: 0;
                border-bottom-left-radius: 12px;
            }

        }

        .content {
            border-top: 1px solid var(--green);
            background-color: var(--green-light);
            padding: 20px 28px 28px 28px;
            .text-normal();
        }

        .actions {
            background-color: var(--green-light);
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: end;
            padding: 8px;

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                color: var(--white);
                .text-normal();
                margin-right: 24px;
                margin-bottom: 12px;
                margin-top: 12px;
                display: flex;
                align-items: center;

                svg {
                    margin-right: 9px;
                }
            }
        }

        @media(max-width: 575px) {
            .title {
                .h4-mob();
            }

            .content {
                .text-normal-mob();
            }
        }
    }
}
</style>