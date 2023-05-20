import { defineStore } from 'pinia'
import type { VerifyCredentials } from '../clients/TwitcastingApiClient'

export const useVerifyCredentialsStore = defineStore('verify_credentials', {
    state: () => ({
        verifyCredentials: null as VerifyCredentials | null,
        isLoaded: false // 初回読み込み済かを判定するのに利用する
    }),
    actions: {
        setVerifyCredentials(verifyCredentials: VerifyCredentials) {
            this.verifyCredentials = verifyCredentials
            this.isLoaded = true
        },
        setLoaded(isLoaded = true) {
            this.isLoaded = isLoaded
        },
        clearVerifyCredentials() {
            this.verifyCredentials = null
        }
    }
})
