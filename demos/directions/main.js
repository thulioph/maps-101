// Directions

// Adiciona listener ao formulário
function InitForm() {
  var form;

  // obtém o elemento do DOM
  form = document.getElementById('form-directions');

  // adiciona um evento de submit ao formulário
  form.addEventListener('submit', _submitForm, true);
}

// Inicializa o mapa
function InitMap() {
  _getUserLocation();
}

// Form helper functions
function _submitForm(event) {
  event.preventDefault();

  var origin, destination, driving, bicycling, walking, form_obj;

  form_obj = {};

  // obtém os valores de cada input
  origin = document.getElementById('origin').value;
  destination = document.getElementById('destination').value;

  // adiciona ao form_obj os valores dos inputs
  form_obj.origin = origin;
  form_obj.destination = destination;

  // obtém os elementos no DOM para cada input
  driving = document.getElementById('driving');
  bicycling = document.getElementById('bicycling');
  walking = document.getElementById('walking');

  // checa o tipo de viagem que foi marcado e adiciona ao form_obj
  if (driving.checked) {
    form_obj.mode = google.maps.TravelMode.DRIVING;
  } else if (bicycling.checked) {
    form_obj.mode = google.maps.TravelMode.BICYCLING;
  } else if (walking.checked) {
    form_obj.mode = google.maps.TravelMode.WALKING;
  }

  _displayRoute(form_obj);
}

function _displayRoute(obj) {
  var service, display;

  // serviços responsáveis pela exibição da rota
  service = new google.maps.DirectionsService;
  display = new google.maps.DirectionsRenderer;

  // renderiza a rota no mapa
  display.setMap(this.map);

  service.route({
    origin: obj.origin,
    destination: obj.destination,
    travelMode: obj.mode
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      console.error('Directions request failed due to ', status);
    }
  });
}

// Map helper functions
function _getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_success, _error);
  } else {
    console.error('Seu navegador não suporta Geolocation!');
  }
}

function _success(position) {
  var latitude, longitude, latlng, mapOptions, map, mapElement, marker, infoWindow;

  // obtém as coordenadas do usuário
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // obtém o elemento do DOM
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
  this.map = new google.maps.Map(mapElement, mapOptions);

  // instanciando um novo marcador
  marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: {
      url: 'img/marker.png'
    }
  });

  // instanciando um InfoWindow
  infoWindow = new google.maps.InfoWindow;

  // abrindo o infowindow
  infoWindow.open(this.map, marker);

  // adicionando um conteúdo para o infowindow
  infoWindow.setContent('Você está aqui!');

  // adiciona evento para o marcador
  marker.addListener('click', _markerClicked);
}

function _error(error) {
  console.error(error);
}

function _markerClicked() {
  console.warn('Marcador clicado: ', this);
}

// Events
window.addEventListener('load', function(event) {
  InitMap();
  InitForm();
});
