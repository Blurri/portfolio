export interface UserCredentials {
  email: string
  password: string
  role?: 'admin' | 'editor' | 'viewer'
}

export const devUser: UserCredentials = {
  email: 'dev@payloadcms.com',
  password: 'test',
  role: 'admin',
}
