<template>
    <div>
        <div class="container mt-3">
            <div v-if="verifyCredentialsStore.verifyCredentials">
                <h1 class="fs-2">録画リスト取得</h1>
                <div class="my-3">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="検索するid" v-model="searchComputed" />
                    </form>
                </div>
                <div v-if="searchUserStore.searchedText" class="card my-3">
                    <div class="card-body">録画の数: {{ movieListStore.total }}</div>
                </div>
                <div class="row">
                    <div v-for="(movie, index) in movieListStore.movies" :key="index" class="col-sm-4 mb-3">
                        <div class="card">
                            <img :src="movie.small_thumbnail" class="card-img-top" alt="サムネイル" />
                            <div class="card-body">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">{{ movie.subtitle }}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">コメント数：{{ movie.comment_count }}</li>
                                <li class="list-group-item">
                                    {{ movie.is_live ? '同時閲覧数：' + movie.current_view_count : '最大閲覧数：' + movie.max_view_count }}
                                </li>
                                <li class="list-group-item">総閲覧数：{{ movie.total_view_count }}</li>
                            </ul>
                            <div class="card-body">
                                <a :href="movie.link" class="btn btn-primary" target="_blank">録画ページに移動する</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto my-2">
                    <button type="button" class="btn btn-success" @click="fetchMovieList" :disabled="movieListStore.currentCount !== 0 && movieListStore.total <= movieListStore.currentCount">
                        録画リスト取得
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
import { computed, reactive, ref } from 'vue'
import { useSearchUserStore } from '../sotres/SearchUserStore'
import Toast from '../components/Toast.vue'
import TwitcastingApiClient from '../clients/TwitcastingApiClient'
import { useMovieListStore } from '../sotres/MovieListStore'
import EmptyState from '../components/EmptyState.vue'
import { useVerifyCredentialsStore } from '../sotres/VerifyCredentialsStore'

const apiClient = new TwitcastingApiClient()
const verifyCredentialsStore = ref(useVerifyCredentialsStore())
const searchUserStore = ref(useSearchUserStore())
const movieListStore = ref(useMovieListStore())
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

const fetchMovieList = async () => {
    if (state.searchText.trim() != searchUserStore.value.searchedText) {
        movieListStore.value.clearMovieList()
        searchUserStore.value.setSearchedText('')
    }
    const movies = await apiClient.getMovieList(state.searchText.trim(), movieListStore.value.currentCount)
    if (!apiClient.isError(movies)) {
        movieListStore.value.setMovieList(movies)
        searchUserStore.value.setSearchedText(state.searchText.trim())
        return
    } else {
        pushError(1, movies.error.message)
    }
}

const searchComputed = computed({
    get: () => state.searchText,
    set: (value: string) => {
        state.searchText = value
        movieListStore.value.clearMovieList()
    }
})
</script>

<style scoped lang="css"></style>
