import { defineStore } from 'pinia'
import type { SupporterUser, SupportingList } from '../clients/TwitcastingApiClient'

export const useSupportingListStore = defineStore('supporting_list', {
    state: () => ({
        total: 0,
        supporting: [] as SupporterUser[],
        currentCount: 0
    }),
    actions: {
        setSupportingList(supportingList: SupportingList) {
            this.total = supportingList.total
            this.supporting.push(...supportingList.supporting)
            this.currentCount += supportingList.supporting.length
        },
        clearSupportingList() {
            this.total = 0
            this.supporting.splice(0, this.supporting.length)
            this.currentCount = 0
        }
    }
})
