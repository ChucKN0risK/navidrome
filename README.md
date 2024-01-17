## Login
admin::lucho

Aussi mis dans le `main.ts`.

## Install
docker-compose up

## To Do
[] Mettre en cache le résultats des requetes des pages principales
[] Le DL d'un track marche depuis le serveur navidrome local (http://0.0.0.0:4533/app/) mais pas depuis notre front. Le warning lié à l'erreur 3Dcanvas de Firefox s'affiche chez les deux. Les requêtes ont l'air d'être les mêmes. Sauf p-e le param optionel bitrate qui est maxBitrate de notre côté. Les deux requètes retourne un 200.
[] Afficher un indicateur de lecture sur la track dans une liste via l'attribut `[aria-current='true']`. A `true` on affiche un icon de lecture. Sans l'attribut on affiche le numéro de track. Comme expliqué ici : https://begin.com/blog/posts/2023-09-28-introducing-enhance-music#enhancing-the-tracklisting
[] Garder en tête toute la logique du player expliqué ici : https://begin.com/blog/posts/2023-09-28-introducing-enhance-music#enhancing-the-audio-player
[] Utiliser la [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) si on veut afficher le controle de la lecture sur les notifications mobile.
