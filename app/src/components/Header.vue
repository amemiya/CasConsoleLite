<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">CasConsole Lite</router-link>
            <router-link v-if="verifyCredentialsStore.verifyCredentials" to="/me">
                <img :src="verifyCredentialsStore.verifyCredentials?.user.image" width="40" height="40" class="rounded-circle" alt="ユーザアイコン" />
            </router-link>
            <div v-else-if="!verifyCredentialsStore.isLoaded" class="d-flex align-items-center">
                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
            <button v-else class="btn btn-light" type="submit" @click="login">ログイン</button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import TwitcastingApiClient from '../clients/TwitcastingApiClient'
import { onMounted, ref } from 'vue'
import { useVerifyCredentialsStore } from '../sotres/VerifyCredentialsStore'
import { useLogin } from '../composables/useLogin'

const apiClient = new TwitcastingApiClient()
const { login } = useLogin()
const verifyCredentialsStore = ref(useVerifyCredentialsStore())

onMounted(async () => {
    if (apiClient.isAccessToken()) {
        const verifyCredentials = await apiClient.verifyCredentials()
        if (!apiClient.isError(verifyCredentials)) {
            verifyCredentialsStore.value.setVerifyCredentials(verifyCredentials)
        }
    }
    verifyCredentialsStore.value.setLoaded()
})
</script>

<style scoped lang="css"></style>
