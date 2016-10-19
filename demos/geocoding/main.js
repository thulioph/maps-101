// Geocoding

function Initialize() {
  var form;

  // obtém o elemento do DOM
  form = document.getElementById('form-geocode');

  // adiciona um evento de submit ao formulário
  form.addEventListener('submit', _submitForm, true);
}

// ====

// Helper functions
function _submitForm(event) {
  event.preventDefault();

  var address, input_address, coordinates, input_coordinates, geocoder;

  address = document.getElementById('address');
  coordinates = document.getElementById('coordinates');

  input_address = document.getElementById('address-input').value;
  input_coordinates = document.getElementById('coordinates-input').value;

  if (address.checked) {
    _geocode('address', input_address);
  } else if (coordinates.checked) {
    _geocode('coords', input_coordinates);
  } else {
    console.warn('Selecione um modo de geocode!');
  }
}

// Verifica o tipo de dado e realiza o geocode
function _geocode(type, value) {
  var geocoder;

  geocoder = new google.maps.Geocoder;

  switch(type) {
    case 'address':
      _geocodeByAddress(value, geocoder);
    break;

    case 'coords':
      _geocodeByCoords(value, geocoder);
    break;
  }
}

// Geocode utilizando endereço
function _geocodeByAddress(address, geocoder) {
  var obj;

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      obj = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
        full_address: results[0].formatted_address
      };

      _displayMap(obj);
    } else {
      console.error('Geocoder falhou por conta de: ' + status);
    }
  });
}

// Geocode utilizando coordenadas
function _geocodeByCoords(coords, geocoder) {
  var obj, coords_array, latlng;

  coords_array = coords.split(',');

  latlng_obj = {
    lat: parseFloat(coords_array[0]),
    lng: parseFloat(coords_array[1])
  };

  geocoder.geocode({'location': latlng_obj}, function(results, status) {
    if (status === 'OK') {
      obj = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
        full_address: results[0].formatted_address
      };

      _displayMap(obj);
    } else {
      console.error('Geocoder falhou por conta de: ' + status);
    }
  });
}

// Exibe o mapa utilizando o retorno da API
function _displayMap(obj) {
  console.log(obj);

  var latlng, mapOptions, map, mapElement, infoWindow, marker;

  // obtendo o elemento do DOM
  mapElement = document.getElementById('map');

  // gerando a latitude e longitude
  latlng = new google.maps.LatLng(obj.lat, obj.lng);

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
  infoWindow.setContent('<h5>' + obj.full_address + '</h5>' + '<h6>' + obj.lat + ' / ' + obj.lng + '</h6>');

  // adiciona evento para o marcador
  marker.addListener('click', _markerClicked);

  // exibe o mapa
  google.maps.event.addDomListener(window, 'load', this);
}

function _markerClicked() {
  console.warn('Marcador clicado: ', this);
}

// ====

// Events
window.addEventListener('load', function(event) {
  Initialize();
});
