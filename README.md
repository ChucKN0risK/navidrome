## Login
admin::lucho

Aussi mis dans le `main.ts`.

## Install
docker-compose up

## To Do
- [] Mettre en cache le résultats des requetes des pages principales
- [] Le DL d'un track marche depuis le serveur navidrome local (http://0.0.0.0:4533/app/) mais pas depuis notre front. Le warning lié à l'erreur 3Dcanvas de Firefox s'affiche chez les deux. Les requêtes ont l'air d'être les mêmes. Sauf p-e le param optionel bitrate qui est maxBitrate de notre côté. Les deux requètes retourne un 200.
- Le player doit pas faire référence à l'album mais uniquement à la cover via l'id de la currentSong. Donc je dois partout où je recupère la cover utiliser l'action `getAlbumCover`. Ensuite, le player utilise le songId du store du player alors qu'on a déjà la `currentSong`. Ce `songId` me semble inutile et je dois essayer d'utiliser `currentSong` à la place.
