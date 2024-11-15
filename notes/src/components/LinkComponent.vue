<template>
    <a class="link" @click.prevent="$emit('action')">
        <slot>
            Ссылка
        </slot>
    </a>
</template>
<style lang="less" scoped>
@import '../assets/text.less';

.link{
    cursor: pointer;
  .text-small-bold();
  transition: .3s ease;
  color: var(--green-light);
  text-decoration: none;
  &:hover {
    color: var(--white);
  }
}
</style>