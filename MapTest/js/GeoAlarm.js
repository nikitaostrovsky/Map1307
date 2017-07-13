var circle, myMap2;

ymaps.ready(function () {																			//при вызове сохраняются координаты цели
	var targetCoords = [55.751374, 37.618826];	//Кремль			
	
	myMap2 = new ymaps.Map("map", {																	//создается карта (КЭП)
        center: targetCoords,
        zoom: 8,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
	
	circle = new ymaps.Circle([targetCoords, 5000], null, {});										//создается круг вокруг цели
	myMap2.geoObjects.add(circle);
//	setInterval(getPos, 1000);
	getPos();
	getPos();
	getPos();
	
	function getPos() {
		navigator.geolocation.watchPosition(onPosGet);												//вызывается функция onPosGet
	}
	
	function onPosGet (position) {
		var myCoords = [position.coords.latitude, position.coords.longitude];						//координаты заново считываются с навигатора
		console.log('onPosGet:' + myCoords);
		var myGeoObject = new ymaps.GeoObject({														//создаем точку на месте Я
	        geometry: {
	            type: "Point",
	            coordinates: myCoords
	        }
		});
		myMap2.geoObjects.add(myGeoObject);															//добавляем ее к объектам карты
//		alert(myMap2.geoObjects.getLength());
//		myMap2.geoObjects.remove(myMap2.geoObjects.get(1));					
//		alert(myMap2.geoObjects.getLength());
		checkInside();																				//в конце каждой секунды проверять, не приехал ли ты
	
	function checkInside() {
		    var objectsInsideCircle = ymaps.geoQuery(myMap2.geoObjects).searchInside(circle);
	        if (objectsInsideCircle.getLength() > 0)
	        	{
	        		console.log("DZIN DZIN DZIN EPTA TI PRIEHAL VIHODI!! Objects on map: " + myMap2.geoObjects.getLength());
	        	}
	        else
	        	{
	        		console.log("ESCHE NE PRIEHAL! Objects on map: " + myMap2.geoObjects.getLength());
	        	}
//	        alert(myMap2.geoObjects.getLength());
	      //myMap2.geoObjects.remove(myMap2.geoObjects.get(1));										//это проверка что реально удаляется точка а не кружок
//	        alert(myMap2.geoObjects.getLength());
	}
}});