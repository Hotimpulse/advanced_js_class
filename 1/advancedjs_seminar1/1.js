"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const musicAlbums = {
  albums: [{
    title: "The Journey Begins",
    artist: "Hans Zimmer",
    year: "1992"
  },
  {
    title: "Echoes of Time",
    artist: "Jane Smith",
    year: "2005"
  },
  {
    title: "Harmony in Motion",
    artist: "David Johnson",
    year: "2018"
  }],
}

for (const album of musicAlbums.albums) {
  const {title, artist, year} = album;
  console.log(`${title} - ${artist} (${year})`);
}

