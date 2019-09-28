var mypoint;
var myMap;
var myPlacemark;
var data;

var point_cur;

function init() {
  mypoint = new ymaps.Placemark([55.77, 37.61], {}, {
    // Setting the placemark style (circle).
    preset: "islands#circleDotIcon",
    // Setting the placemark color (in RGB format).
    iconColor: '#ff0000'
  });

  var objs = json2;
  data = [];
  for (var i = 0; i < objs.data.length; i++) {
    data.push([objs.data[i].coordinates.latitude, objs.data[i].coordinates.longitude])
  }

  var routeList = [];
  for (var j = 0; j < 3; ++j) {
    routeList.push([objs.data[j].coordinates.latitude, objs.data[j].coordinates.longitude])
  }
  initRoute(routeList);

  myMap = new ymaps.Map('map', {
    center: [55.750625, 37.626],
    zoom: 11,
    controls: [trafficButton, viaPointButton, 'zoomControl']
  }, {
    //buttonMaxWidth: 300
  });
  addPoints(data);

  myMap.geoObjects.add(multiRoute);
  myMap.geoObjects.add(mypoint);
}

function draw_heatmap() {
  var heatmap = new ymaps.Heatmap(data, {
    // Радиус влияния.
    radius: 15,
    // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
    dissipating: false,
    // Прозрачность тепловой карты.
    opacity: 0.8,
    // Прозрачность у медианной по весу точки.
    intensityOfMidpoint: 0.2,
    // JSON описание градиента.
    gradient: {
      0.1: 'rgba(128, 255, 0, 0.7)',
      0.2: 'rgba(255, 255, 0, 0.8)',
      0.7: 'rgba(234, 72, 58, 0.9)',
      1.0: 'rgba(162, 36, 25, 1)'
    }
  });
  heatmap.setMap(myMap);
}

ymaps.ready(init);
ymaps.ready(['Heatmap']);
ymaps.ready(draw_heatmap);
