export enum EnumAccountType {
  local = 'Локальная',
  ldap = 'LDAP'
}

export interface IAccount {
  id: string,
  tags: string[],
  accType: EnumAccountType,
  login: string,
  password: string
}
