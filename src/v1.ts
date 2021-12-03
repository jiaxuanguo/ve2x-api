import { PrivateClient } from './types'

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

export interface SiteNode {
  id : number
  name : string,
  url : string,
  title : string,
  title_alternative : string,
  topics : number,
  header : string,
  footer : string,
  created : number
}
export async function getAllSiteNodes(this: PrivateClient) {
  const res = await this._client.get<SiteNode[]>('/nodes/all.json')
  return res.data
}

export async function getSiteNode(id: number): Promise<SiteNode>
export async function getSiteNode(name: string): Promise<SiteNode>
export async function getSiteNode(this: PrivateClient, idOrName: number | string) {
  const paramName = typeof idOrName === 'number' ? 'id' : 'name'
  const res = await this._client.get<SiteNode>('/nodes/all.json', {
    params: {
      [paramName]: idOrName
    }
  })
  return res.data
}
