<script setup lang="ts">
import { defineProps, onMounted, PropType, reactive, ref } from 'vue'
import { EnumAccountType, IAccount } from '../../types/account.types'
import { useAccountsStore } from '@/store/account.store'

const store = useAccountsStore()
const props = defineProps({
  accountId: {
    type: String,
    require: true
  }
})
const accountObject = store.accounts.find((acc) => acc.id === props.accountId)
const isPasswordHidden = ref(true)
</script>

<template>
  <div class="accounts__row" :style="{
      gridTemplateColumns:
        accountObject.accType === EnumAccountType.ldap
          ? '1fr 150px 2fr 40px'
          : '1fr 150px 1fr 1fr 40px',
    }">

    <input type="text" class="accounts__input" maxlength="50" v-model="accountObject.tags" />

    <div class="accounts__select">
      <select v-model="accountObject.accType">
        <option v-for="(value, key) in EnumAccountType" :key="key" :value="value">{{ value }}</option>
      </select>
    </div>

    <input type="text" class="accounts__input" :class="{'long-login': accountObject.accType === EnumAccountType.ldap}"
           placeholder="Логин" required maxlength="100" v-model="accountObject.login"/>

    <div class="accounts__password" v-if="accountObject.accType === EnumAccountType.local">
      <input type="password" class="accounts__input hide" required v-if="isPasswordHidden"
             v-model="accountObject.password"/>
      <input type="text" class="accounts__input show" required v-else v-model="accountObject.password"/>

      <button class="accounts__eye" @click="isPasswordHidden = !isPasswordHidden">
        <span class="accounts__eye-icon-hide" v-if="isPasswordHidden"></span>
        <span class="accounts__eye-icon-show" v-else></span>
      </button>
    </div>

    <div class="accounts__delete" @click="store.deleteAccount(props.accountId)">
      <img src="@/assets/delete.svg" alt="" width="38">
    </div>
  </div>
</template>

<style scoped lang="scss">
.accounts__row {
  display: grid;
  gap: 12px;
  align-items: center;
}

.accounts__input {
  width: calc(100% - 24px);
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;

  .accounts::placeholder {
    color: #999;
  }
}

.accounts__select {
  select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: white;
    font-size: 14px;
  }
}

.accounts__password {
  position: relative;
  display: flex;
  align-items: center;
}

.accounts__eye {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  &-icon-hide {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("@/assets/password-hide.svg");
  }

  &-icon-show {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("@/assets/password-show.svg");
  }
}
</style>
