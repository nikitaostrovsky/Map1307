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

    // Добавляем конечную и начальную точки на карту. 									//вывод шариков на карту
      myMap.geoObjects.add(targetPoint);
      myMap.geoObjects.add(sourcePoint);


    // Создаём маршрут нужного типа из начальной в конечную точку.
    currentRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [sourcePoint, targetPoint],
        params: { routingMode: 'auto'}
    }, {
        boundsAutoApply: true
    });
    
    // Добавляем маршрут на карту.
    myMap.geoObjects.add(currentRoute);
//    var newRoute = ymaps.route(['Кронштадт, Якорная площадь',
//                 'Санкт-Петербург, Финляндский вокзал'], {avoidTrafficJams: true});
    //alert(newRoute.getTime());
    
    /*ymaps.route([		//неработающая промис хуйня
                 'Королёв',
                 { type: 'viaPoint', point: 'Мытищи' },
                 'Химки',
                 { type: 'wayPoint', point: [55.811511, 37.312518] }
             ], {
                 mapStateAutoApply: true
             }).then(function (route) {
                 route.getPaths().options.set({
                     // В балуне выводим только информацию о времени движения с учетом пробок.
                     balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                     // Можно выставить настройки графики маршруту.
                     strokeColor: '0000ffff',
                     opacity: 0.9
                 });
                 // добавляем маршрут на карту
                 window.map.geoObjects.add(route);
                 alert(route.getPaths());
             });*/
    
//    ymaps.route(['Москва', 'Питер'],{}, function (route) {alert(route);
//    								}, function (route) {alert(route);
//    								});
//    }
    
    }
});


    