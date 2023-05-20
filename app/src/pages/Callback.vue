<template>
    <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
        <span class="visually-hidden">処理中です</span>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import StringUtil from '../utils/StringUtil'
import LocalStorageUtil from '../utils/LocalStorageUtil'

const route = useRoute()
onMounted(async () => {
    const accessToken = StringUtil.getUrlParamsToArray(route.params.id.toString())
    if (accessToken !== null) {
        LocalStorageUtil.setAccessToken(accessToken)
    }
    document.location = '/' // リロードさせたいのでわざとトップリダイレクトかける
})
</script>

<style scoped></style>
