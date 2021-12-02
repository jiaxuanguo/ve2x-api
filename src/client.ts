import axios, { AxiosAdapter, AxiosResponse } from 'axios'
// @ts-ignore too lazy to deal with this
import adapter from 'axios/lib/adapters/http'
import dayjs from 'dayjs'
import HttpsProxyAgent from 'https-proxy-agent'
import { Options } from './types'

interface Cache {
  get(url: string): AxiosResponse | null
  set(url: string, response: AxiosResponse): void
}
function createMapCache <T>(): Cache {
  const map = new Map<string, { response: AxiosResponse, time: dayjs.Dayjs }>()
  return {
    get(url) {
      const data = map.get(url)
      if (data) {
        const now = dayjs()
        const { response, time } = data
        if (time.add(5, 'm').isAfter(now)) {
          return response
        } else {
          map.delete(url)
        }
      }
      return null
    },
    set(url, response) {
      const time = dayjs()
      map.set(url, { response, time })
    }
  }
}

const createCacheAdapter = (cache: Cache): AxiosAdapter => {
  return async config => {
    const isGet = config.method?.toLowerCase() === 'get'
    const url = axios.getUri(config)
    const cachedResponse = cache.get(url)
    if (isGet && cachedResponse) {
      return {
        ...cachedResponse,
        config: { ...config, ...cachedResponse.config },
      }
    }
    const response = await adapter(config)
    if (isGet) {
      cache.set(url, response)
    }
    return response
  }
}

export const createAxiosInstance = ({ proxy, token }: Options = {}) => {
  const baseURL = 'https://www.v2ex.com/api'

  let httpsAgent
  if (proxy) {
    httpsAgent = HttpsProxyAgent(proxy)
  }
  const adapter = createCacheAdapter(createMapCache())

  const client = axios.create({
    proxy: false,
    httpsAgent,
    baseURL,
    adapter
  })
  if (token) {
    client.interceptors.request.use(config => {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
    })
  }
  client.interceptors.response.use(response => response, error => {
    console.log(error)
  })
  return client
}
