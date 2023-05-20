import StringUtil from '../utils/StringUtil'
import LocalStorageUtil from '../utils/LocalStorageUtil'

export interface AccessToken {
    access_token: string
    token_type: string
    expires_in: number
    state: string
    expired_at: number
}

export interface User {
    id: string
    screen_id: string
    name: string
    image: string
    profile: string
    level: number
    last_movie_id: string
    is_live: boolean
    supported?: undefined // SupporterUserと一緒に使うのでTSエラー回避のために
    supporter_count: number
    supporting_count: number
    created: number
    point?: undefined // SupporterUserと一緒に使うのでTSエラー回避のために
    total_point?: undefined // SupporterUserと一緒に使うのでTSエラー回避のために
}

export interface SupporterUser {
    id: string
    screen_id: string
    name: string
    image: string
    profile: string
    level: number
    last_movie_id: string
    is_live: boolean
    supported: number
    supporter_count: number
    supporting_count: number
    created: number
    point: number
    total_point: number
}

export interface Movie {
    id: string
    user_id: string
    title: string
    subtitle: string
    last_owner_comment: string
    category: string
    link: string
    is_live: boolean
    is_recorded: boolean
    comment_count: number
    large_thumbnail: string
    small_thumbnail: string
    country: string
    duration: number
    created: number
    is_collabo: boolean
    is_protected: boolean
    max_view_count: number
    current_view_count: number
    total_view_count: number
    hls_url: string
}

export interface VerifyCredentials {
    app: {
        client_id: string
        name: string
        owner_user_id: string
    }
    user: User
    supporter_count: number
    supporting_count: number
}

export interface SupportingList {
    total: number
    supporting: SupporterUser[]
}

export interface SupporterList {
    total: number
    supporting: SupporterUser[]
}

export interface MovieList {
    total_count: number
    movies: Movie[]
}

export interface Error {
    error: {
        code: number
        message: string
    }
}

export default class TwitcastingApiClient {
    static readonly BASE_URL: string = 'https://apiv2.twitcasting.tv'
    static readonly LOGIN_URL: string = 'https://apiv2.twitcasting.tv/oauth2/authorize'
    static readonly CLIENT_ID: string = 'ccasconsole.7786d72b5ff7fe968070109680f2be34a5915ee0cc2410402345b36cdc88fde4'

    public constructor(private readonly accessToken: AccessToken | null = LocalStorageUtil.getAccessToken()) {}

    public getLoginUrl(): string {
        const loginUrl = TwitcastingApiClient.LOGIN_URL
        const clientId = TwitcastingApiClient.CLIENT_ID
        const csrf = StringUtil.generateRandomString(30)
        return `${loginUrl}?client_id=${clientId}&response_type=token&state=${csrf}`
    }

    public async verifyCredentials(): Promise<VerifyCredentials | Error> {
        const response = await fetch(TwitcastingApiClient.BASE_URL + `/verify_credentials`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'X-Api-Version': '2.0',
                Authorization: `Bearer ${this.getAccessToken().access_token}`
            }
        })
        if (response.ok) {
            return (await response.json()) as VerifyCredentials
        }
        return (await response.json()) as Error
    }

    public async getMovieList(userId: string, offset = 0, limit = 20): Promise<MovieList | Error> {
        const response = await fetch(TwitcastingApiClient.BASE_URL + `/users/${userId}/movies?offset=${offset}&limit=${limit}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'X-Api-Version': '2.0',
                Authorization: `Bearer ${this.getAccessToken().access_token}`
            }
        })
        if (response.ok) {
            return (await response.json()) as MovieList
        }
        return (await response.json()) as Error
    }

    /**
     * ターゲットのuserがサポートしているリスト
     * @param userId
     * @param offset
     * @param limit
     */
    public async getSupportingList(userId: string, offset = 0, limit = 20): Promise<SupportingList | Error> {
        const response = await fetch(TwitcastingApiClient.BASE_URL + `/users/${userId}/supporting?offset=${offset}&limit=${limit}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'X-Api-Version': '2.0',
                Authorization: `Bearer ${this.getAccessToken().access_token}`
            }
        })
        if (response.ok) {
            return (await response.json()) as SupportingList
        }
        return (await response.json()) as Error
    }

    /**
     * ターゲットのuserがサポートされているリスト(ツイキャスでサポートリストに出てくるやつ)
     * @param userId
     */
    public async getSupporterList(userId: string): Promise<SupporterList | Error> {
        const response = await fetch(TwitcastingApiClient.BASE_URL + `/users/${userId}/supporters`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'X-Api-Version': '2.0',
                Authorization: `Bearer ${this.getAccessToken().access_token}`
            }
        })
        if (response.ok) {
            return (await response.json()) as SupporterList
        }
        return (await response.json()) as Error
    }

    isError = (obj: any): obj is Error => obj.error?.code !== undefined && obj.error?.message !== undefined

    isAccessToken(): boolean {
        const isAccessToken = LocalStorageUtil.getAccessToken()
        return isAccessToken !== null
    }

    private getAccessToken(): AccessToken {
        if (this.accessToken === null) {
            throw new Error()
        }
        return this.accessToken
    }
}
