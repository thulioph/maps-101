// Geocoding

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_success, _error);
  } else {
    console.error('Seu navegador não suporta Geolocation!');
  }
}

function _success(position) {
  var latitude, longitude, latlng, mapOptions, map, mapElement, infoWindow, marker;

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
  marker.addListener('click', _toggleInfoWindow);

  // exibe o mapa
  google.maps.event.addDomListener(window, 'load', _success);
}

// helper functions
function _toggleInfoWindow() {
  console.warn('Marcador clicado: ', this);
}

function _error(error) {
  console.error(error);
}

window.addEventListener('load', function(event) {
  getUserLocation();
});
