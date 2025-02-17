import { defineStore } from 'pinia'
import { EnumAccountType, IAccount } from '../../types/account.types'
import { generateUuid } from '../../shared/functions'

const defaultValue: { accounts: IAccount[] } = {
  accounts: [
    {
      id: generateUuid(),
      tags: [{ text: '' }],
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
        tags: [{ text: '' }],
        accType: EnumAccountType.local,
        login: '',
        password: ''
      })
    },
    deleteAccount (id: string) {
      this.$state.accounts.splice(this.$state.accounts.findIndex((acc: IAccount) => {
        return acc.id === id
      }), 1)
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    saveAccount (newAccount: IAccount) {
      const index = this.accounts.findIndex((acc: IAccount) => acc.id === newAccount.id)
      this.accounts[index] = { ...newAccount }
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    loadAccounts () {
      const storedAccounts = localStorage.getItem('accounts')
      if (storedAccounts) {
        this.accounts = JSON.parse(storedAccounts)
      }
    }
  }
})
