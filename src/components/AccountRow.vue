<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import { EnumAccountType } from '../../types/account.types'
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
const text = ref('')

const isTagsVal = ref(true)
const isLoginVal = ref(true)
const isPasswordVal = ref(true)

function convertTagsStringToArray (tagsString: string) {
  if (!tagsString.trim()) {
    return []
  }
  return tagsString.split(';').map(tag => ({ text: tag.trim() }))
}

const validateFields = () => {
  if (!accountObject) return
  const regex = /^[^;\s]+(;\s*[^;\s]+)*$/
  isTagsVal.value = (regex.test(text.value) || text.value === '')
  isLoginVal.value = (accountObject.login !== '')
  isPasswordVal.value = (accountObject.password.length >= 8 || accountObject.accType === EnumAccountType.ldap)

  if (isTagsVal.value && isLoginVal.value && isPasswordVal.value) {
    store.saveAccount({
      id: accountObject.id,
      tags: convertTagsStringToArray(text.value),
      accType: accountObject.accType,
      login: accountObject.login,
      password: accountObject.password
    })
  }
}

onMounted(() => {
  text.value = accountObject?.tags.map(tag => tag.text).join('; ') || ''
})
</script>

<template>
  <div :style="{
      gridTemplateColumns:
        accountObject.accType === EnumAccountType.ldap
          ? '1fr 150px 2fr 40px'
          : '1fr 150px 1fr 1fr 40px',
    }" class="accounts__row">

    <input v-model="text" :class="{'non-valid': !isTagsVal}" class="accounts__input" maxlength="50" type="text"
           @blur="validateFields"/>

    <div class="accounts__select">
      <select v-model="accountObject.accType" @change="validateFields">
        <option v-for="(value, key) in EnumAccountType" :key="key" :value="value">{{ value }}</option>
      </select>
    </div>

    <input v-model="accountObject.login" :class="{'long-login': accountObject.accType === EnumAccountType.ldap, 'non-valid': !isLoginVal}"
           class="accounts__input"
           maxlength="100" placeholder="Логин" required type="text" @blur="validateFields"/>

    <div v-if="accountObject.accType === EnumAccountType.local" class="accounts__password">
      <input v-if="isPasswordHidden" v-model="accountObject.password" :class="{'non-valid': !isPasswordVal}" class="accounts__input hide"
             required
             type="password" @blur="validateFields"/>
      <input v-else v-model="accountObject.password" :class="{'non-valid': !isPasswordVal}" class="accounts__input show" required
             type="text" @blur="validateFields"/>

      <button class="accounts__eye" @click="isPasswordHidden = !isPasswordHidden">
        <span v-if="isPasswordHidden" class="accounts__eye-icon-hide"></span>
        <span v-else class="accounts__eye-icon-show"></span>
      </button>
    </div>

    <div class="accounts__delete" @click="store.deleteAccount(props.accountId)">
      <img alt="" src="@/assets/delete.svg" width="38">
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.non-valid {
  border: 1px solid #f00;
}
</style>
