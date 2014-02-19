
// Создание дополнительного control для Google map -- Full Screen
function FullScreenControl(map) {
	var controlDiv = document.createElement('div');
	//controlDiv.index = 1;
	

	// установка стилей соответственно другим элементам карты
	controlDiv.style.padding = '7px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderColor = '#717b87';
 // controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set fullScreen';
  controlDiv.appendChild(controlUI);

	
 var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Full Screen<b>'
  controlUI.appendChild(controlText);
	var fullScreen = false;
	// получаем DOM объект, который содержит карту, и его стили
	var mapDiv = map.getDiv();
	var divStyle = mapDiv.style;
	if (mapDiv.runtimeStyle)
		divStyle = mapDiv.runtimeStyle;
	var originalPos = divStyle.position;
	var originalWidth = divStyle.width;
	var originalHeight = divStyle.height;
	
	// IE8 
	if (originalWidth == "")
		originalWidth = mapDiv.style.width;
	if (originalHeight == "")
		originalHeight = mapDiv.style.height;
	
	var originalTop = divStyle.top;
	var originalLeft = divStyle.left;
	var originalZIndex = divStyle.zIndex;

	var bodyStyle = document.body.style;
	if (document.body.runtimeStyle)
		bodyStyle = document.body.runtimeStyle;
	var originalOverflow = bodyStyle.overflow;
	// переход на полный экран
	var goFullScreen = function() {
		var center = map.getCenter();
		mapDiv.style.position = "fixed";
		mapDiv.style.width = "100%";
		mapDiv.style.height = "100%";
		mapDiv.style.top = "0";
		mapDiv.style.left = "0";
		mapDiv.style.zIndex = "100";
		document.body.style.overflow = "hidden";
		controlText.innerHTML = '<strong>Exit full screen</strong>';
		fullScreen = true;
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
	};
	// переход в первоначальное положение
	var exitFullScreen = function() {
		var center = map.getCenter();
		if (originalPos == "")
			mapDiv.style.position = "relative";
		else
			mapDiv.style.position = originalPos;
		mapDiv.style.width = originalWidth;
		mapDiv.style.height = originalHeight;
		mapDiv.style.top = originalTop;
		mapDiv.style.left = originalLeft;
		mapDiv.style.zIndex = originalZIndex;
		document.body.style.overflow = originalOverflow;
		controlText.innerHTML = '<strong>Full Screen</strong>';
		fullScreen = false;
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
	}
	
	// установка click event listener
	google.maps.event.addDomListener(controlUI, 'click', function() {
		var originalCenter=map.getCenter();
		if (!fullScreen) {
			goFullScreen();
		}
		else {
			exitFullScreen();
		}
		var newCenter = map.getCenter();
		test( "проверка сдвига центра при полном экране", function() {
		
		equal( newCenter, originalCenter, "Центр не должен сместиться" );
		});
	});
	
	return controlDiv;
}
