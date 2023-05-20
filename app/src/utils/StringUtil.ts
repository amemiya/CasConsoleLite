import type { AccessToken } from '../clients/TwitcastingApiClient'

export default class StringUtil {
    static generateRandomString(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let str = ''
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return str
    }

    static getUrlParamsToArray(params: string): AccessToken | null {
        const accessToken: AccessToken = <AccessToken>{}
        const array = params.slice(1).split('&')
        for (let i = 0; i < array.length; i++) {
            const keyValue = array[i].split('=')
            if (keyValue[0] === 'access_token') {
                accessToken.access_token = keyValue[1]
            } else if (keyValue[0] === 'token_type') {
                accessToken.token_type = keyValue[1]
            } else if (keyValue[0] === 'expires_in') {
                accessToken.expires_in = Number(keyValue[1])
                accessToken.expired_at = new Date().getTime() + accessToken.expires_in
            } else if (keyValue[0] === 'state') {
                accessToken.state = keyValue[1]
            } else {
                return null
            }
        }
        return accessToken
    }
}
