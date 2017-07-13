var targetCoords;

ymaps.ready(function () {
	
	navigator.geolocation.watchPosition(createRoute, function () {alert('Ошибка при определении координат устройства!');});
    
    function createRoute (position) {
		var fromCoords = [position.coords.latitude, position.coords.longitude];
		
		window.targetCoords = [55.751374, 37.618826];	//Кремль
		
	// Инициализируем карту.
    var myMap = new ymaps.Map('map', {
            center: window.targetCoords,
            zoom: 9,
            controls: [],
            searchControlProvider: 'yandex#search'
        }, {
            // Ограничиваем количество результатов поиска.
            searchControlResults: 1,

            // Отменяем автоцентрирование к найденным адресам.
            searchControlNoCentering: true,

            // Разрешаем кнопкам нужную длину.
            buttonMaxWidth: 150
        }),

    // Метка для конечной точки маршрута.
        targetPoint = new ymaps.Placemark(window.targetCoords, { iconContent: 'Target point' }, { preset: 'islands#redStretchyIcon' }),

    // Метка для начальной точки маршрута.
        sourcePoint = new ymaps.Placemark(fromCoords, { iconContent: 'Я' }, { preset: 'islands#redStretchyIcon' }),

    // Переменные, в которых будут храниться ссылки на текущий маршрут.
        currentRoute;
    
	    var actualProvider = new ymaps.traffic.provider.Actual({}, {infoLayerShown: true});					//слой пробок
	    actualProvider.setMap(myMap)

    // Добавляем конечную и начальную точки на карту. 									//вывод шариков на карту
      myMap.geoObjects.add(targetPoint);
      myMap.geoObjects.add(sourcePoint);

      ymaps.route([window.targetCoords, fromCoords], {
    	    multiRoute: false
    	}).done(function (route) {
    	    route.options.set("mapStateAutoApply", true);
    	    alert("Time:" + route.getTime() + "\n JamsTime: " + route.getJamsTime());
    	    myMap.geoObjects.add(route);
    	}, function (err) {
    	    throw err;
    	}, this);
      
    // Создаём маршрут нужного типа из начальной в конечную точку.
/*    currentRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [sourcePoint, targetPoint],
        params: { routingMode: 'auto'}
    }, {
        boundsAutoApply: true
    });
    
    // Добавляем маршрут на карту.
    myMap.geoObjects.add(currentRoute);	
  */  
    }
});


    