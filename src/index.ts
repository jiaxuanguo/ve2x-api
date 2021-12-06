import { createAxiosInstance } from './client'
import { Options } from './types'
import * as v1 from './v1'
import * as v2 from './v2'

function createV2exApiClient (options?: Options) {
  const axios = createAxiosInstance(options)
  return {
    _token: options?.token,
    _client: axios,
    ...v1,
    ...v2
  }
}

export { Options, createV2exApiClient }
