import { defineStore } from 'pinia'
import type { Movie, MovieList } from '../clients/TwitcastingApiClient'

export const useMovieListStore = defineStore('movie_list', {
    state: () => ({
        total: 0,
        movies: [] as Movie[],
        currentCount: 0
    }),
    actions: {
        setMovieList(movies: MovieList) {
            this.total = movies.total_count
            this.movies.push(...movies.movies)
            this.currentCount += movies.movies.length
        },
        clearMovieList() {
            this.total = 0
            this.movies.splice(0, this.movies.length)
            this.currentCount = 0
        }
    }
})
