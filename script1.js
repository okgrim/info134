/* <script type="text/javascript">*/
   var markers = [];
function initialize() {

       var mapOptions = {
           zoom: 15,
           center: new google.maps.LatLng(60.392636, 5.321342),
           mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);


       var locations = [
           ['<div id="infoInnhold">'+
           '<b>Ricks</b> is a triple decked club for those who like crowds</br>'+
           'Located in one of the more bustling areas of Bergen,</br>'+
           'it floats the boat of those with a need for mingling</br>'+
           '<img src="ricksInfo.png" style="height:100px;width:150px"></br>'+
           '<i>Adress: Chr. Michelsens gate 10, 5011 Bergen</i>'+
           '</div>'
           , 60.392636, 5.321342],
           ['<b>Don Pippo</b> is a small wine-and-beer bar,</br>'+
           'boasting one of Bergens most relaxed atmospheres.</br>'+
           'Looking for a calmer approach to the night-life?</br>'+
           'visit Don Pippo!</br>'+
           '<img src="donPippoInfo.jpg" style="height:100px;width:150px"></br>'+
           '<i>Adress: Christies gate 11, 5015 Bergen </i>'
           , 60.389680, 5.322974],
           ['</b>Garage</b> is know for being a watering hole for the alternative</br>'+
           'Should the lounge, hip-hop or electro scene not be your thing,</br> '+
           'make sure to visit garage </br>'+
           '<img src="GarageInfo.jpg" style="height:100px;width100px;"></br>'+
           '<i> Adress: Christies gate 14, 5015 Bergen </i>'
           , 60.389586, 5.323835],
           ['<b>No Stress</b> is the best place for the drink-connoisseur in Bergen.</br>'+
           'With a wide selection of their own recipies, No Stress has a drink for everyone.</br>'+
           'Start your night with a chili martini, and have a go at their nintendo!</br>'+
           '<img src="noStressInfo.jpg" style="height:100px;width:175px"></br>'+
           '<i> Adress: Hollendergaten 11, 5017 Bergen</i>'
           , 60.395035, 5.326585],
           ['</b>Biskopen</b> is your everyday cozy bar, hosted by a pleasant staff,</br>'+
           'located in the middle of the city centre. Lorem ipsum, and such. </br>'+
           'Rinkating, do the thing. Hubba hubba zoot zoot</br>'+
           '<img src="biskopenInfo.jpg" style="height:100px;width:150px"></br>'+
           '<i> Adress: Neumanns gate 18, 5015 Bergen </i>'
           , 60.391358, 5.320346],
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
