<template>
    <div>
        <div class="container mt-3">
            <div v-if="verifyCredentialsStore.verifyCredentials">
                <h1 class="fs-2">サポートリスト取得</h1>
                <div class="my-3">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="検索するid" v-model="searchComputed" />
                    </form>
                </div>
                <div v-if="0 < supportingListStore.supporting.length" class="card my-3">
                    <div class="card-body">サポート数: {{ supportingListStore.total }}</div>
                </div>
                <div v-for="(supporting, index) in supportingListStore.supporting" :key="index">
                    <UserCard :supporterUser="supporting" />
                </div>
                <div class="d-grid gap-2 col-6 mx-auto my-2">
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="fetchSupportingList"
                        :disabled="supportingListStore.currentCount !== 0 && supportingListStore.total <= supportingListStore.currentCount"
                    >
                        サポートリスト取得
                    </button>
                </div>
            </div>
            <EmptyState v-else-if="verifyCredentialsStore.isLoaded" />
            <div v-else>
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <Toast ref="childComponent" :errors="state.errors" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import TwitcastingApiClient from '../clients/TwitcastingApiClient'
import Toast from '../components/Toast.vue'
import UserCard from '../components/UserCard.vue'
import { useSupportingListStore } from '../sotres/SupportingListStore'
import { useSearchUserStore } from '../sotres/SearchUserStore'
import EmptyState from '../components/EmptyState.vue'
import { useVerifyCredentialsStore } from '../sotres/VerifyCredentialsStore'
const verifyCredentialsStore = ref(useVerifyCredentialsStore())

const apiClient = new TwitcastingApiClient()
const supportingListStore = ref(useSupportingListStore())
const searchUserStore = ref(useSearchUserStore())
const state = reactive({
    searchText: '',
    errors: []
})
const childComponent = ref()
const pushError = (id: number, message: string) =>
    childComponent.value.push(state.errors, {
        id: id,
        message: message,
        show: false
    })

onMounted(() => {
    state.searchText = searchUserStore.value.searchedText
})

const fetchSupportingList = async () => {
    if (state.searchText.trim() != searchUserStore.value.searchedText) {
        supportingListStore.value.clearSupportingList()
        searchUserStore.value.setSearchedText('')
    }
    const supportingList = await apiClient.getSupportingList(state.searchText.trim(), supportingListStore.value.currentCount)
    if (!apiClient.isError(supportingList)) {
        supportingListStore.value.setSupportingList(supportingList)
        searchUserStore.value.setSearchedText(state.searchText.trim())
        return
    } else {
        pushError(1, supportingList.error.message)
    }
}

const searchComputed = computed({
    get: () => state.searchText,
    set: (value: string) => {
        state.searchText = value
        supportingListStore.value.clearSupportingList()
    }
})
</script>

<style scoped lang="css"></style>
