<template>
    <div class="card mb-3">
        <div class="g-0">
            <div class="row mx-0 my-2">
                <div class="col">
                    <img :src="props.supporterUser.image" width="73" height="73" class="rounded-circle" alt="ユーザアイコン" />
                </div>
                <div class="col d-flex align-items-center">
                    <p class="card-text">
                        <small v-if="props.supporterUser.point && props.supporterUser.total_point" class="text-muted">
                            ポイント: {{ props.supporterUser.point }} / {{ props.supporterUser.total_point }}
                        </small>
                        <br />
                        <small class="text-muted"> レベル: {{ props.supporterUser.level }} </small>
                        <br />
                        <small v-if="props.supporterUser.supported" class="text-muted"> サポートした日: {{ createdAt(props.supporterUser.supported) }} </small>
                    </p>
                </div>
            </div>
            <div>
                <div class="card-body">
                    <h5 class="card-title">
                        {{ props.supporterUser.name }}
                        <small class="text-muted">@{{ props.supporterUser.screen_id }}</small>
                    </h5>
                    <p class="card-text">{{ props.supporterUser.profile }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SupporterUser, User } from '../clients/TwitcastingApiClient'

const props = withDefaults(
    defineProps<{
        supporterUser: SupporterUser | User
    }>(),
    {}
)
const createdAt = (created: number) => new Date(created * 1000).toLocaleString('ja')
</script>

<style scoped lang="css"></style>
