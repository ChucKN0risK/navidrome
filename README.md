## Login
admin::lucho

Aussi mis dans le `main.ts`.

## Launch
1. Run `docker-compose up` in root directory
2. Run `yarn dev` in `front` directory

## State of the project
- Download of a track doesn't work on the custom app. It does on the Navidrome UI though. The request is triggered but the file never gets downloaded byt the browser.
- Tester l'app en static avec Astro en utilisant fetch(): https://docs.astro.build/en/guides/data-fetching/#fetch-in-astro

## To Do
- [] Mettre en cache le résultats des requetes des pages principales
- [] Le DL d'un track marche depuis le serveur navidrome local (http://0.0.0.0:4533/app/) mais pas depuis notre front. Le warning lié à l'erreur 3Dcanvas de Firefox s'affiche chez les deux. Les requêtes ont l'air d'être les mêmes. Sauf p-e le param optionel bitrate qui est maxBitrate de notre côté. Les deux requètes retournent un 200.
- [] Afficher un indicateur de lecture sur la track dans une liste via l'attribut `[aria-current='true']`. A `true` on affiche un icon de lecture. Sans l'attribut on affiche le numéro de track. Comme expliqué ici : https://begin.com/blog/posts/2023-09-28-introducing-enhance-music#enhancing-the-tracklisting
- [] Garder en tête toute la logique du player expliqué ici : https://begin.com/blog/posts/2023-09-28-introducing-enhance-music#enhancing-the-audio-player
- [] Utiliser la [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) si on veut afficher le controle de la lecture sur les notifications mobile.
- [] Tester l'app en tant que PWA : https://blog.openreplay.com/vue3--building-a-progressive-web-app/
- Ajouter le temps écoulé de la chanson / temps total du track
- Faire en sorte que le menu d'un élément d'une liste soit un block qui prenne toute la largeur de l'écran et qui vienne du bas (comme sur Bandcamp ou Soundcloud) sur small viewports. Sur large viewport on implémente un click droit normal avec les même éléments.
- [x] Implémenter une <SearchBar> qui sera dans le menu en bas pour les petits viewports et dans le <main> pour les viewports plus larges
- [] Remplacer le DOM du <Drawer> par l'élément <Dialog> natif: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#usage_notes
- [x] Playlist view: Mettre la durée d'un track tout à droite quand pour large viewports
- [] Trouver un moyen de charger dynamiquement les composants selon la taille du viewport
  - [] Lister toutes les playlist dans le <MainNav> pour large viewports
  - [] <Player> éxiste uniquement pour small viewports si y'a un track qui joue (ou alors on fait un empty state)
  - [] <Drawer> éxiste uniquement pour small viewports
  - [] <SearchBar> éxiste uniquement pour large viewports dans la sidebar

## To keep in mind
- A PWA is based on Service Workers + the Cache API
  - A Service Worker acts as a proxy between the browser and the server
  - It caches resources (assets, fonts, images) to make them available when we're offline
  - It can sync data in the background
  - It's doesn't have access to the DOM
- An SSG which becomes hydrated also seem to be a good solution. Most of the page can be rendered as HTML files on the server as their content doesn't change. The only part of the app that changes is the queue and the player itself. Everything else can be static.
- Playlists exported through the macOS Music app are not compatible with Navidrome because of the tracks path.
  - The original path generated is relative to the macOS user path (`/Users/lucho/Music/Music/Chymera/Wish (Original Mix).mp3`). Whereas Navidrome needs the path to be relative to the music folder in the Docker container (`/music/Yotam Avni/Mystik.mp3`). It means, playlist files must be updated following their export from the Apple Music app everytime.

## How to generate playlists from Doppler
1. Export playlist from Music
2. Screenshot the missing track added in Doppler and generate CSV out of it (https://www.extracttable.com/)
3. Generate JSON out of it (https://csvjson.com/csv2json)
4. Write script to
  - convert duration from HH:MM:SS to SSSSS
  - add path to music track with `find` command (ex: `find /music/Music -iname "Russian tv.mp3"`)
