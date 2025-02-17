import { defineStore } from 'pinia'
import { EnumAccountType, IAccount } from '../../types/account.types'
import { generateUuid } from '../../shared/functions'

const defaultValue: { accounts: IAccount[] } = {
  accounts: [
    {
      id: generateUuid(),
      tags: [''],
      accType: EnumAccountType.local,
      login: '',
      password: ''
    }
  ]
}

export const useAccountsStore = defineStore('accounts', {
  state: () => defaultValue,
  actions: {
    addAccount () {
      this.$state.accounts.push({
        id: generateUuid(),
        tags: [''],
        accType: EnumAccountType.local,
        login: '',
        password: ''
      })
    },
    deleteAccount (id: string) {
      this.$state.accounts.splice(this.$state.accounts.findIndex((acc) => {
        return acc.id === id
      }), 1)
    }
  }
})
