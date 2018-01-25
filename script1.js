/* <script type="text/javascript">*/
   var markers = [];
function initialize() {

       var mapOptions = {
           zoom: 14,
           center: new google.maps.LatLng(60.392636, 5.321342),
           mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);


       var locations = [
           ['<div id="infoInnhold">'+
           '<b>Ricks<b> holder til i Christies Gate 11.</br>'+
           'Her kan du finne lettkledde tanter'+
           'og onkler som ønsker å ta på tantene.'+
           '<img src="ricksbilde.png">'+
           '</div>'
           , 60.392636, 5.321342],
           ['<b>DonPippo</b> kan sutte tett med snopp.', 60.389680, 5.322974],
           ['</b>Garage</b> er et sted hvor man parkerer bilen sin', 60.389586, 5.323835]
       ];


       var marker, i;
       var infowindow = new google.maps.InfoWindow();


       google.maps.event.addListener(map, 'click', function() {
           infowindow.close();
       });


       for (i = 0; i < locations.length; i++) {
           marker = new google.maps.Marker({
               position: new google.maps.LatLng(locations[i][1], locations[i][2]),
               map: map,
               icon: locations[i][3]
           });

           google.maps.event.addListener(marker, 'click', (function(marker, i) {
               return function() {
                   infowindow.setContent(locations[i][0]);
                   infowindow.open(map, marker);
               }
           })(marker, i));

           markers.push(marker);
       }

   }
   google.maps.event.addDomListener(window, 'load', initialize);

   function myClick(id){
       google.maps.event.trigger(markers[id], 'click');
   }
/*</script>*/
