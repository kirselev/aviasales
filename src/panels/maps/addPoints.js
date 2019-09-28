function addPoints(data) {
  for (var k = 0; k < data.length / 2; ++k) {
    point_cur = new ymaps.GeoObject({
      // Описание геометрии.
      geometry: {
        type: "Point",
        coordinates: data[k],
        //radius: 100
        //size: [100, 100]
      },
      // Свойства.
      properties: {
        // Контент метки.
        //iconContent: 'Я тащусь',
        //hintContent: 'Ну давай уже тащи'
      }
    }, {
      // Опции.
      // Иконка метки будет растягиваться под размер ее содержимого.
      preset: 'islands#circleDotIcon',
      iconColor: 'rgba(229,98,255,0.86)',
      // Метку можно перемещать.
      draggable: false
    });
    myMap.geoObjects.add(point_cur);
  }
}
