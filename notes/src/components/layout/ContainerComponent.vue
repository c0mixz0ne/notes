<template>
    <div class="container">
        <slot>
            Данные не получены в slot
        </slot>
    </div>
</template>

<style scoped>
.container {
    width: auto;
    margin-inline: auto;
    max-width: 1600px;
}
</style>