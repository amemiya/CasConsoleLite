import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Callback from './pages/Callback.vue'
import Me from './pages/Me.vue'
import Supporting from './pages/Supporting.vue'
import Movie from './pages/Movie.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/callback/:id', name: 'Callback', component: Callback },
    { path: '/me', name: 'Me', component: Me },
    { path: '/supporting', name: 'Supporting', component: Supporting },
    { path: '/movies', name: 'Movie', component: Movie }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
