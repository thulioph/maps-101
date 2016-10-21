// Drawing

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_success, _error);
  } else {
    console.error('Seu navegador não suporta Geolocation!');
  }
}

// ====

// Helper functions
function _success(position) {
  var latitude, longitude, latlng, mapOptions, map, mapElement, infoWindow, marker, drawingManager;

  // obtém as coordenadas do usuário
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // obtendo o elemento do DOM
  mapElement = document.getElementById('map');

  // gerando a latitude e longitude
  latlng = new google.maps.LatLng(latitude, longitude);

  // configurações do mapa
  mapOptions = {
    zoom: 15,
    center: latlng,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // gerando o mapa
  map = new google.maps.Map(mapElement, mapOptions);

  // instanciando um novo marcador
  marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: {
      url: 'img/marker.png'
    }
  });

  // instanciando um InfoWindow
  infoWindow = new google.maps.InfoWindow;

  // abrindo o infowindow
  infoWindow.open(map, marker);

  // adicionando um conteúdo para o infowindow
  infoWindow.setContent('Você está aqui!');

  // adiciona evento para o marcador
  marker.addListener('click', _markerClicked);

  // Habilita a função de desenhar no mapa
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      editable: true,
      clickable: true,
      draggable: true,
      strokeColor: '#1E90FF',
      strokeOpacity: 0.7,
      fillColor: '#1E90FF',
      fillOpacity: 0.2,
      strokeWeight: 2,
    }
  });

  window.drawingManager = drawingManager;

  // habilita o desenho no mapa
  drawingManager.setMap(map);

  // seta como nulo a opção de desenhar no mapa por default
  drawingManager.setDrawingMode(null);

  // evento para quando um desenho for concluído
  google.maps.event.addListener(drawingManager, 'polygoncomplete', getCoordinates);
  google.maps.event.addListener(drawingManager, 'overlaycomplete', _getCoordinates);
}

function _error(error) {
  console.error(error);
}

function _markerClicked() {
  console.warn('Marcador clicado: ', this);
}

function getCoordinates(polygon) {
  var coordinates;

  coordinates = (polygon.getPath().getArray());

  console.warn('As coordenadas desenhadas foram: ', coordinates);
}

function _getCoordinates(e) {
  console.log(e);

  var newShape;

  drawingManager.setDrawingMode(null);

  newShape = e.overlay;
  newShape.type = e.type;

  google.maps.event.addListener(newShape, 'click', function(shape) {
    console.warn(shape.latLng.lat(), shape.latLng.lng());
  });
}

// ====

// Events
window.addEventListener('load', function(event) {
  getUserLocation();
});
