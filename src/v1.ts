import { PrivateClient } from './types'

export async function getSiteInfo(this: PrivateClient) {
  const res = await this._client.get('/site/info.json')
  return res.data
}
