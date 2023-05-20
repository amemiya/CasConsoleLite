import type { AccessToken } from '../clients/TwitcastingApiClient'

export default class LocalStorageUtil {
    static readonly ACCESS_TOKEN = 'access_token'
    static setAccessToken(accessToken: AccessToken): void {
        window.localStorage.setItem(LocalStorageUtil.ACCESS_TOKEN, JSON.stringify(accessToken))
    }

    static getAccessToken(): AccessToken | null {
        const value = window.localStorage.getItem(LocalStorageUtil.ACCESS_TOKEN)
        if (value === null) {
            return null
        }
        return JSON.parse(value) as AccessToken
    }

    static deleteAccessToken(): void {
        window.localStorage.removeItem(LocalStorageUtil.ACCESS_TOKEN)
    }
}
