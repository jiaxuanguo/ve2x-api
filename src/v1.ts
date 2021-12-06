import { Avatars, Contents, PrivateClient } from './types'

export interface SiteInfo {
  title: string
  slogan: string
  description: string
  domain: string
}
export async function getSiteInfo(this: PrivateClient) {
  const res = await this._client.get<SiteInfo>('/site/info.json')
  return res.data
}

export interface SiteStats {
  topic_max: number
  member_max: number
}
export async function getSiteStats(this: PrivateClient) {
  const res = await this._client.get<SiteStats>('/site/stats.json')
  return res.data
}

export interface SiteNode extends Avatars {
  id : number
  name : string
  url : string
  title : string
  title_alternative : string
  topics : number
  header : string
  footer : string
  created : number
  stars: number
  aliases: string[]
  root: boolean
  parent_node_name: string
}
export async function getAllSiteNodes(this: PrivateClient) {
  const res = await this._client.get<SiteNode[]>('/nodes/all.json')
  return res.data
}

export async function getSiteNode(id: number): Promise<SiteNode>
export async function getSiteNode(name: string): Promise<SiteNode>
export async function getSiteNode(this: PrivateClient, idOrName: number | string) {
  const paramName = typeof idOrName === 'number' ? 'id' : 'name'
  const res = await this._client.get<SiteNode>('/nodes/show.json', {
    params: {
      [paramName]: idOrName
    }
  })
  return res.data
}

export interface Topic extends Contents {
  id: number
  title: string
  url: string
  replies: number
  member: Member
  node: SiteNode
  created: number
  deleted: number
  last_modified: number
  last_touched: number
  last_reply_by: string
}
export async function getTopicsByType(this: PrivateClient, type: 'latest' | 'hot') {
  const res = await this._client.get<Topic[]>(`/topics/${type}.json`)
  return res.data
}
export interface TopicSearchParams {
  id?: number
  username?: string
  node_id?: number
  node_name?: string
}
export async function getTopicsBySearch(this: PrivateClient, searchParams: TopicSearchParams) {
  const { id, username, node_id, node_name } = searchParams
  const params: TopicSearchParams = {}
  if (id !== undefined) {
    params.id = id
  } else if (username) {
    params.username = username
  } else if (node_id !== undefined) {
    params.node_id = node_id
  } else if (node_name) {
    params.node_name = node_name
  } else {
    throw new Error(`something wrong with TopicSearchParams: ${JSON.stringify(searchParams)}`, )
  }
  const res = await this._client.get<Topic[]>(`/topics/show.json`, { params })
  return res.data
}

export interface Member extends Avatars {
  id : number
  username : string
  tagline : string
  url : string
  github: string
  psn: string
  website : string
  twitter : string
  location : string
  bio : string
  created : number
}
export async function getMember(this: PrivateClient, username: string) {
  const res = await this._client.get<Member>('/members/show.json', { params: { username } })
  return res.data
}

export interface Reply extends Contents {
  id: number
  thanks?: number
  member: Member
  created: number
  last_modified: number
}
export async function getReplies(this: PrivateClient, topic_id: number, page: number = 1, page_size: number = 10) {
  const res = await this._client.get<Member>('/replies/show.json', { params: { topic_id, page, page_size } })
  return res.data
}
