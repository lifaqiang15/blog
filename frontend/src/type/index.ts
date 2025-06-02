export interface User {
  id: number
  username: string
  role: 'admin' | 'blogger' | 'user'
  avatar: string | null
  created_time: string
  token?: string
}
