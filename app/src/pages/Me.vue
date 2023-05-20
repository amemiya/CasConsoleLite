<template>
    <div>
        <h1 class="m-3 fs-2">マイページ</h1>
        <section>
            <div v-if="verifyCredentialsStore.verifyCredentials" class="m-3">
                <UserCard :supporter-user="verifyCredentialsStore.verifyCredentials?.user" />
            </div>
            <div v-if="!verifyCredentialsStore.verifyCredentials">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
                <li class="list-group-item cursor-pointer" @click="logout">ログアウト</li>
                <li class="list-group-item"></li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
import LocalStorageUtil from '../utils/LocalStorageUtil'
import { useVerifyCredentialsStore } from '../sotres/VerifyCredentialsStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const verifyCredentialsStore = ref(useVerifyCredentialsStore())
const router = useRouter()
const logout = () => {
    LocalStorageUtil.deleteAccessToken()
    verifyCredentialsStore.value.clearVerifyCredentials()
    router.push('/')
}
</script>

<style scoped lang="css">
.cursor-pointer {
    cursor: pointer;
}
</style>
