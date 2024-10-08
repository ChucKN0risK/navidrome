import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'artists',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Artists.vue')
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: () => import('../views/Playlists.vue')
    },
    {
      path: '/artists/:id',
      name: 'artist',
      component: () => import('../views/Artist.vue'),
      props: true,
    },
    {
      path: '/playlists/:id',
      name: 'playlist',
      component: () => import('../views/Playlist.vue'),
      props: true,
    },
    {
      path: '/artists/:artistId/album/:albumId',
      name: 'album',
      component: () => import('../views/Album.vue'),
      props: true,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      props: true,
    },
  ]
})

export default router
