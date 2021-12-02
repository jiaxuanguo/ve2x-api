import { AxiosInstance } from 'axios'

export interface PrivateClient {
  _client: AxiosInstance
}
export interface Options {
  proxy?: string
  token?: string
}
