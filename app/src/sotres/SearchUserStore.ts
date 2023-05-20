import { defineStore } from 'pinia'

export const useSearchUserStore = defineStore('search_user', {
    state: () => ({
        searchedText: ''
    }),
    actions: {
        setSearchedText(searchedText: string) {
            this.searchedText = searchedText
        }
    }
})
