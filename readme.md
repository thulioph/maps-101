# Google Maps 101

Este material foi desenvolvido para auxiliar no entendimento de alguns conceitos a respeito da Google Maps API. Você irá passar por uma série de conteúdos que foram desenvolvidos de uma maneira bem simples para exemplificar melhor cada serviço.

Para realizar os testes de requisição iremos utilizar o [Postman](https://www.getpostman.com/) e caso você não tenha em sua máquina, aconselho a realizar o download, após o download será necessário importar a collection do projeto que se encontra [neste link](https://goo.gl/ILeu4W).

## Como obter uma Key
A primeira coisa que você precisa fazer antes de iniciar um projeto com Maps, é criar um novo projeto no [Console de APIs](https://console.developers.google.com/?hl=pt-br) para se obter as chaves necessárias. Existem dois tipos diferentes: **server key** e **browser key**. Como o próprio nome ja diz, uma é utilizada do lado do navegador e a outra do lado do servidor, porém ambas possuem o mesmo objetivo que são gerar métricas a respeito da utilização da API e monitorar o uso.

## Hello World
- exibir um mapa
- exibir a localização do usuário
- exibir um marcador personalizado
- adicionar evento de click no marcador

## Geocoding
Utilizado para converter endereços em coordenadas, ou coordenadas em endereço.

**endpoint**

por endereço:
```
https://maps.googleapis.com/maps/api/geocode/json?address=ENDERECO&language=IDIOMA&key=CHAVE
```

por coordenadas:
```
https://maps.googleapis.com/maps/api/geocode/json?latlng=LATITUDE,LONGITUDE&language=IDIOMA&key=CHAVE
```

**o que você precisa fornecer**
- um endereço ou coordenadas (latitude/longitude)
- uma chave de acesso
- idioma do retorno *(opcional)*

**casos de uso**
- exibir uma localização no mapa
- exibir um determinado endereço com base nas coordenadas
- obter mais informações sobre a localização de um determinado usuário

**links**
- [testar no postman](https://documenter.getpostman.com/collection/view/64448-61788af1-12e5-89d3-16f9-94fedfe4b33b#Geocoding)
- [documentação](https://developers.google.com/maps/documentation/geocoding/intro)
- [exemplo](https://github.com/thulioph/maps-101/tree/master/demos/geocoding)

## Distance Matrix
Calcula a distância e duração de um curso e/ou viagem entre várias origens e destinos.

**endpoint**
```
https://maps.googleapis.com/maps/api/distancematrix/json?origins=ORIGEM|ORIGEM&destinations=DESTINO|DESTINO&mode=MODO-DE-VIAGEM&language=IDIOMA&departure_time=HORARIO-DA-PARTIDA&traffic_model=TIPO-DE-TRAFEGO&key=CHAVE
```

**o que você precisa fornecer**
- um ou mais endereços de origem
- um ou mais endereços de destino
- um modo de viagem
- timestamp da hora de partida *(opcional)*
- condições de tráfego
  - melhor estimativa de tempo de percurso (best_guess)
  - maior que o tempo de percurso normal (pessimistic)
  - menor que o tempo de percurso normal (optimistic)
- uma chave de acesso
- idioma do retorno *(opcional)*

**casos de uso**
- estimar a distância de uma viagem
- estimar a duração de uma viagem

**links**
- [testar no postman](https://documenter.getpostman.com/collection/view/64448-61788af1-12e5-89d3-16f9-94fedfe4b33b#Distance-Matrix)
- [documentação](https://developers.google.com/maps/documentation/javascript/distancematrix?hl=pt-BR)
- [exemplo](https://github.com/thulioph/distance-direction/)

## Directions
Utilizado para obter informações sobre uma determinada rota ou direção.

**endpoint**
```
https://maps.googleapis.com/maps/api/directions/json?origin=ORIGEM&destination=DESTINO&mode=MODO-DE-VIAGEM&language=IDIOMA&waypoints=PONTO-DE-REFERENCIA|PONTO-DE-REFERENCIA&key=CHAVE
```

**o que você precisa fornecer**
- um endereço de origem
- um endereço para destino
- um modo de viagem
- pontos de referência ou waypoints *(opcional)*
- uma chave de acesso
- idioma do retorno *(opcional)*

**casos de uso**
- traçar a rota entre dois pontos
- criar um sistema de navegação passo a passo

**links**
- [testar no postman](https://documenter.getpostman.com/collection/view/64448-61788af1-12e5-89d3-16f9-94fedfe4b33b#Directions)
- [documentação](https://developers.google.com/maps/documentation/javascript/directions)
- [exemplo](https://github.com/thulioph/distance-direction/)

## Street View Service
Utilizado na exibição de visualizações panorâmicas em 360º.

**código**

```html
<!-- o mapa será exibido aqui -->
<div id="map-container"></div>

<!-- o street view será exibido aqui -->
<div id="streetview-container"></div>
```

```javascript
var map = new google.maps.Map(document.getElementById('map-container'), {
  center: userPosition,
  zoom: 14
});

var streetView = new google.maps.StreetViewPanorama(
  document.getElementById('streetview-container'), {
    position: userPosition,
    pov: {
      heading: 34,
      pitch: 10
    }
  }
);

map.setStreetView(streetView);
```

**o que você precisa fornecer**
- um elemento HTML para exibição do mapa
- um elemento HTML para exibição do street view
- as coordenadas do local que você quer exibir
- uma chave de acesso

**casos de uso**
- exibir a localização no mapa
- exibir informações detalhadas sobre determinado local

**links**
- [documentação](https://developers.google.com/maps/documentation/javascript/examples/streetview-simple)
- [exemplo](https://github.com/thulioph/street-panorama)

## Street View Image API
Utilizado para se obter uma imagem estática da visualização em street view de uma determinada localização.

**url**
```html
https://maps.googleapis.com/maps/api/streetview?size=LARGURAxALTURA&location=LATITUDE,LONGITUDE&fov=ZOOM&heading=ANGULO-HORIZONTAL&pitch=ANGULO-VERTICAL&key=CHAVE
```

**o que você precisa fornecer**
- um endereço ou coordenadas (latitude/longitude)
- uma chave de acesso
- ajustes na imagem *(opcionais)*
  - tamanho
  - ângulo de rotação horizontal
  - ângulo de rotação vertical
  - zoom

**casos de uso**
- exibir uma localização no mapa
- exibir um determinado endereço com base nas coordenadas
- obter mais informações sobre a localização de um determinado usuário

**links**
- [testar no postman](https://documenter.getpostman.com/collection/view/64448-61788af1-12e5-89d3-16f9-94fedfe4b33b#Street-View-Images-API)
- [documentação](https://developers.google.com/maps/documentation/streetview/intro)
- [exemplo](https://github.com/thulioph/street-panorama)

## Roads API
Possibilita você mapear

## Links úteis
- https://developers.google.com/maps/documentation/javascript/marker-clustering#markerclusterer
- https://www.npmjs.com/package/http-server
- https://developer.mozilla.org/pt-BR/docs/Using_geolocation
- http://tableless.com.br/api-google-maps-v3/
- http://codepen.io/collection/DadGxx/
