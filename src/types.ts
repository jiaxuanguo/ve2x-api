import { AxiosInstance } from 'axios'

export interface PrivateClient {
  _client: AxiosInstance
}
export interface Options {
  proxy?: string
  token?: string
}
export interface Avatars {
  avatar_mini : string
  avatar_normal : string
  avatar_large : string
}
export interface Contents {
  content: string
  content_rendered: string
}
