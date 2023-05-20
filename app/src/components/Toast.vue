<template>
    <div ref="container" class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div v-for="item in errors" :id="item.id" :key="item.id" class="toast fade opacity-75 bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="15000">
            <div class="toast-header bg-danger">
                <strong class="me-auto text-white">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-white error-body">{{ item.message }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue'
import { Toast } from 'bootstrap'

const TOASTS_MAX = 5
const props = withDefaults(
    defineProps<{
        errors: {
            id: string
            message: string
            show: boolean
        }[]
    }>(),
    {}
)

const push = (toastErrors: { id: string; message: string; show: boolean }[], data: { id: string; message: string; show: boolean }) => {
    if (TOASTS_MAX < toastErrors.length) {
        toastErrors.shift()
        toastErrors.push(data)
    } else {
        toastErrors.push(data)
    }
}

// 親側から呼び出す為のおまじない
defineExpose({
    push
})

onUpdated(() => {
    props.errors
        .filter((error) => !error.show)
        .forEach(function (error) {
            const errorToast = document.getElementById(error.id)
            if (!errorToast) {
                return // 要素が見つからない場合はスキップ
            }
            const toast = new Toast(errorToast)
            toast.show()
            error.show = true
            errorToast.addEventListener('hidden.bs.toast', () => {
                const indexOfObject = props.errors.findIndex((item) => {
                    return item.id === error.id
                })
                if (indexOfObject !== -1) {
                    props.errors.splice(indexOfObject, 1)
                }
            })
        })
})
</script>

<style scoped lang="css"></style>
