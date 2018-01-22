function initMap() {
  var ricks = {lat: 60.392636, lng: 5.321342};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: ricks,
  });

  var locations = [
  ["Ricks", 60.392636, 5.321342, 1],
  ["Don Pippo", 60.389680, 5.322974, 2],
  ["Garage", 60.389586, 5.323835, 3],
];

  var infowindow = new google.maps.InfoWindow();

  var marker,i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
  }

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));




}
