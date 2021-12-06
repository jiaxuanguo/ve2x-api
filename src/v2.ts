import { Member, PrivateClient, Token, Notification, SiteNodeV2, TopicV2, ReplyV2 } from './types'

export interface V2SuccessResponse<T>  {
  result: T
  success: true
  message?: string
}
export interface V2FailResponse {
  success: false
  message: string
}
type V2ResponseWrapper<T> = V2SuccessResponse<T> | V2FailResponse

export async function getOwnProfile(this: PrivateClient) {
  const res = await this._client.get<V2ResponseWrapper<Member>>('/v2/member')
  return res.data
}

export async function getToken(this: PrivateClient) {
  const res = await this._client.get<V2ResponseWrapper<Token>>('/v2/token')
  return res.data
}

export async function getNotifications(this: PrivateClient, page: number) {
  const res = await this._client.get<V2ResponseWrapper<Notification[]>>('/v2/notifications', { params: { p: page } })
  return res.data
}

export async function getSiteNodeV2(this: PrivateClient, nodeName: string) {
  const res = await this._client.get<V2ResponseWrapper<SiteNodeV2>>(`/v2/nodes/${nodeName}`)
  return res.data
}

export async function getTopicsV2(this: PrivateClient, nodeName: string, page: number) {
  const res = await this._client.get<V2ResponseWrapper<TopicV2[]>>(`/v2/nodes/${nodeName}/topics`, { params: { p: page } })
  return res.data
}

export async function getTopicV2(this: PrivateClient, topicId: number) {
  const res = await this._client.get<V2ResponseWrapper<TopicV2>>(`/v2/topics/${topicId}`)
  return res.data
}

export async function getRepliesV2(this: PrivateClient, topicId: number, page: number) {
  const res = await this._client.get<V2ResponseWrapper<ReplyV2[]>>(`/v2/topics/${topicId}/replies`, { params: { p: page } })
  return res.data
}
