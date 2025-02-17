<script lang="ts" setup>
import AccountRow from '@/components/AccountRow.vue'
import { onMounted } from 'vue'
import { useAccountsStore } from '@/store/account.store'

const store = useAccountsStore()

onMounted(() => {
  store.loadAccounts()
})
</script>

<template>
  <div class="accounts">
    <div class="accounts__header">
      <h1 class="accounts__title">Учетные записи</h1>
      <button class="accounts__add" @click="store.addAccount()">+</button>
    </div>

    <div class="accounts__info">
      <span class="accounts__info-icon">?</span>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="accounts__form">
      <div class="accounts__labels">
        <div class="accounts__label">Метки</div>
        <div class="accounts__label">Тип записи</div>
        <div class="accounts__label">Логин</div>
        <div class="accounts__label">Пароль</div>
        <div class="accounts__label"></div>
      </div>

      <div class="accounts__rows">
        <AccountRow v-for="account in store.accounts" :key="account" :account-id="account.id"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accounts {
  padding: 20px;

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: normal;
    margin: 0;
  }

  &__add {
    width: 40px;
    height: 40px;
    border: 1px solid #e0e0e0;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    background: #f5f8ff;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__info-icon {
    width: 20px;
    height: 20px;
    border: 1px solid #999;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }

  &__labels {
    display: grid;
    grid-template-columns: 1fr 150px 1fr 1fr 40px;
    gap: 12px;
    margin-bottom: 12px;
  }

  &__label {
    color: #666;
    font-size: 14px;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
