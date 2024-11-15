<template>
    <div class="user">
        <div class="user-email">login@email.ru</div>
        <div class="user-image">
            <img src="../assets/images/user.svg" alt="Пользователь">
        </div>
    </div>
</template>
<style lang="less" scoped>
.user{
  display: flex;
  align-items: center;
  cursor: pointer;
  .user-email{
    margin-right: 12px;
  }
  .user-image{
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background-color: var(--dark-middle);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>