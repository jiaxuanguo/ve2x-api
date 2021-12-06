import { AxiosInstance } from 'axios'

export interface PrivateClient {
  _client: AxiosInstance
  _token?: string
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

export interface SiteInfo {
  title: string
  slogan: string
  description: string
  domain: string
}

export interface SiteStats {
  topic_max: number
  member_max: number
}

export interface SiteNode extends Avatars {
  id: number
  name: string
  url: string
  title: string
  title_alternative: string
  topics: number
  header: string
  footer: string
  created: number
  stars: number
  aliases: string[]
  root: boolean
  parent_node_name: string
}

export interface Topic extends Contents {
  id: number
  title: string
  url: string
  replies: number
  member: Member
  node: SiteNode
  created: number
  deleted?: number
  last_modified: number
  last_touched: number
  last_reply_by: string
}

export interface Member extends Avatars {
  id: number
  username: string
  tagline: string
  url: string
  github: string
  psn: string
  website: string
  twitter: string
  location: string
  bio: string
  created: number
}

export interface Reply extends Contents {
  id: number
  thanks?: number
  member: Member
  created: number
  last_modified: number
}

export type TokenScope = 'everything' | 'regular'
export type TokenExpiration = 259200 | 5184000 | 15552000
export interface Token {
  token: 'string'
  scope: TokenScope
  expiration: TokenExpiration
  good_for_days: number
  total_used: number
  last_used: number
  created: number
}

export interface Notification {
  id: number
  member_id: number
  for_member_id: number
  text: string
  payload: string
  payload_rendered: string
  created: number
  member: {
    username: string
  }
}

export interface SiteNodeV2 {
  id: number
  url: string
  name: string
  title: string
  header: string
  footer: string
  avatar: string
  topics: number
  created: number
  last_modified: number
}

export type TopicV2 = Omit<Topic, 'member' | 'node'> & { syntax: 1 }
export interface ReplyV2 extends Contents {
  id: number
  member: {
    id: number
    username: string
    bio: string
    website: string
    github: string
    url: string
    avatar: string
    created: number
  }
  created: number
}
