<template>
    <div class="container mt-3">
        <h1 class="fs-1">CasConsole Lite</h1>
        <p class="mb-5">
            このサービスはツイキャスのAPIを使って色々な情報を取得することができます<br />
            今後さらに機能を追加していく予定です
        </p>
        <div v-if="verifyCredentialsStore.verifyCredentials">
            <h2 class="fs-3">ツイキャスAPIから情報を取得</h2>
            <div class="mt-3">
                <ul class="list-group">
                    <router-link to="/supporting" style="text-decoration: none">
                        <li class="list-group-item list-group-item-action fs-5">サポートリスト取得</li>
                    </router-link>
                    <router-link to="/movies" style="text-decoration: none">
                        <li class="list-group-item list-group-item-action fs-5">録画一覧</li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div v-else-if="verifyCredentialsStore.isLoaded">
            <p>このサービスはツイキャス連携でログインすることによって利用できます</p>
            <div class="d-grid gap-2 col-6 mx-auto my-2">
                <button type="button" class="btn btn-success" @click="login">ログインする</button>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVerifyCredentialsStore } from '../sotres/VerifyCredentialsStore'
import { useLogin } from '../composables/useLogin'

const verifyCredentialsStore = ref(useVerifyCredentialsStore())
const { login } = useLogin()
</script>

<style scoped lang="css"></style>
