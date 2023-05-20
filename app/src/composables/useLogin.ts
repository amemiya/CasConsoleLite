import TwitcastingApiClient from '../clients/TwitcastingApiClient'

export function useLogin() {
    const login = () => {
        document.location = new TwitcastingApiClient().getLoginUrl()
    }
    return { login }
}
