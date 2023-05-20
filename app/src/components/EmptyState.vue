<template>
    <div>
        <div class="container">
            <div class="card blank-state text-center text-muted my-4 px-5 py-3">
                <h3 class="h3">このページはログイン後に表示されるページです</h3>
                <p>以下のリンクからツイキャス連携ログインをしてください</p>
                <div class="d-grid gap-2 col-6 mx-auto my-2">
                    <button type="button" class="btn btn-success" @click="login">ログイン</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLogin } from '../composables/useLogin'

const { login } = useLogin()
</script>

<style scoped lang="css"></style>
