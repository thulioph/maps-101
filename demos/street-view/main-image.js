// Street View
// image api

function Initialize() {
  var form;

  // obtém o elemento do DOM
  form = document.getElementById('form-image');

  // adiciona um evento de submit ao formulário
  form.addEventListener('submit', _submitForm, true);
}

// ====


// Helper functions
function _submitForm(event) {
  event.preventDefault();

  var width, height, heading, pitch, fov, obj, user_pos;

  width = document.getElementById('range-width').value;
  height = document.getElementById('range-height').value;
  heading = document.getElementById('heading').value;
  pitch = document.getElementById('pitch').value;
  fov = document.getElementById('fov').value;

  user_pos = JSON.parse(sessionStorage.getItem('user_pos'));

  obj = {
    'width': width,
    'height': height,
    'heading': heading,
    'pitch': pitch,
    'fov': fov,
    'lat': user_pos.lat,
    'lng': user_pos.lng
  };

  _buildImage(obj);
}

function _buildImage(obj) {
  var image, imageUrl;

  imageUrl = 'https://maps.googleapis.com/maps/api/streetview?size=' + obj.width + 'x' + obj.height + '&location=' + obj.lat + ',' + obj.lng + '&fov=' + obj.fov + '&heading=' + obj.heading + '&pitch=' + obj.pitch + '&key=AIzaSyBphP6jOsoGcoMNUqwGG5MQ75tR4IlJckI'

  image = document.getElementById('image-maps');
  image.setAttribute('src', imageUrl);
}

// ====

// Events
window.addEventListener('load', function(event) {
  Initialize();
});
