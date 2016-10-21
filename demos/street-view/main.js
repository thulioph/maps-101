// Street View
// service

function GetUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_success, _error);
  } else {
    console.error('Seu navegador não suporta Geolocation!');
  }
}

function SaveUserPosition(lat, lng) {
  var obj;

  obj = {
    'lat': lat,
    'lng': lng
  };

  sessionStorage.setItem('user_pos', JSON.stringify(obj));
}

function _success(position) {
  console.log(position);

  var latitude, longitude, latlng, mapOptions, map, mapElement, panElement, marker, streetView, panOptions;

  // obtém as coordenadas do usuário
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // salva a posição do usuário para utilizar no decorrer da página
  SaveUserPosition(latitude, longitude);

  // obtendo o elemento do DOM
  mapElement = document.getElementById('map');

  // obtendo o elemento do DOM
  panElement = document.getElementById('street-view');

  // gerando a latitude e longitude
  latlng = new google.maps.LatLng(latitude, longitude);

  // configurações do mapa
  mapOptions = {
    zoom: 15,
    center: latlng,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // configurações do streetView
  panOptions = {
    position: latlng,
    pov: {
      heading: 34, // rotação horizontal
      pitch: 10 // rotação vertical
    }
  };

  // gerando o mapa
  map = new google.maps.Map(mapElement, mapOptions);

  // gerando o streetView
  streetView = new google.maps.StreetViewPanorama(panElement, panOptions);

  // instanciando um novo marcador
  marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: {
      url: 'img/marker.png'
    }
  });

  // adiciona evento para o marcador
  marker.addListener('click', _markerClicked);

  // seta o streetView no mapa
  map.setStreetView(streetView);
}

function _error(error) {
  console.error(error);
}

function _markerClicked() {
  console.warn('Marcador clicado: ', this);
}

// Events
window.addEventListener('load', function(event) {
  GetUserLocation();
});
