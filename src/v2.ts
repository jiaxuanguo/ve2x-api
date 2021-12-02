import { PrivateClient } from './types'

export async function getOwnProfile(this: PrivateClient) {
  const res = await this._client.get('/v2/member')
  return res.data
}
