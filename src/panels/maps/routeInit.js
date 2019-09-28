var multiRoute;
var trafficButton;
var viaPointButton;

function initRoute(rtLst) {
  multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: rtLst,
    params: {
      results: 2
    }
  }, {
    boundsAutoApply: true
  });
  trafficButton = new ymaps.control.Button({
    data: { content: "Учитывать пробки" },
    options: { selectOnClick: true }
  });
  viaPointButton = new ymaps.control.Button({
    data: { content: "Добавить транзитную точку" },
    options: { selectOnClick: true }
  });
  trafficButton.events.add('select', function () {
    multiRoute.model.setParams({ avoidTrafficJams: true }, true);
  });
  trafficButton.events.add('deselect', function () {
    multiRoute.model.setParams({ avoidTrafficJams: false }, true);
  });
  viaPointButton.events.add('select', function () {
    var referencePoints = multiRoute.model.getReferencePoints();
    referencePoints.splice(1, 0, "Москва, ул. Солянка, 7");
    multiRoute.model.setReferencePoints(referencePoints, [1]);
  });
  viaPointButton.events.add('deselect', function () {
    var referencePoints = multiRoute.model.getReferencePoints();
    referencePoints.splice(1, 1);
    multiRoute.model.setReferencePoints(referencePoints, []);
  });
}
