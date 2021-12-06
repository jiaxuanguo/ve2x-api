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

const client = createV2exApiClient({
  proxy: 'http://127.0.0.1:10809',
  token: '1b7c657b-f59b-45d8-ba0d-9ffcb56ca7ce'
})
async function test() {
  // @ts-ignore
  console.log((await client.getOwnProfile()))
}

test()
