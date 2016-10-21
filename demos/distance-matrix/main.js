// Distance Matrix

function Initialize() {
  var form;

  // obtém o elemento do DOM
  form = document.getElementById('form-distanceMatrix');

  // adiciona um evento de submit ao formulário
  form.addEventListener('submit', _submitForm, true);
}

// ====

// Helper functions
function _submitForm(event) {
  event.preventDefault();

  var origin, destination, driving, bicycling, walking, form_obj;

  form_obj = {};

  // obtém os valores de cada input
  origin = document.getElementById('origin').value;
  destination = document.getElementById('destination').value;

  // adiciona ao form_obj os valores dos inputs
  // origem e destino precisam ser arrays
  form_obj.origin = [origin];
  form_obj.destination = [destination];

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

  _makeRequest(form_obj);
}

function _makeRequest(obj) {
  var geocoder, service, elements;

  geocoder = new google.maps.Geocoder;
  service = new google.maps.DistanceMatrixService;

  service.getDistanceMatrix({
    origins: obj.origin,
    destinations: obj.destination,
    travelMode: obj.mode
  }, function(response, status) {
    if (status === 'OK') {
      for (var i = 0; i < response.rows.length; i++) {
        elements = response.rows[i].elements;

        elements.forEach(function(p) {
          _displayData(p);
        });
      }
    }
  })
}

function _displayData(obj) {
  var distance, duration;

  distance = document.getElementById('distance');
  duration = document.getElementById('duration');

  distance.innerHTML = obj.distance.text;
  duration.innerHTML = obj.duration.text;
}

// ====

// Events
window.addEventListener('load', function(event) {
  Initialize();
});
