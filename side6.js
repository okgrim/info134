var leke = new XMLHttpRequest;
var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
leke.onreadystatechange = function(){
  if(leke.readyState === 4 && this.status === 200){
    var ferdig = JSON.parse(leke.responseText);
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      lekeplass.push(liste[i]);
    }
    console.log(ferdig);
    listeFunksjon(ferdig);
  }
}
leke.open("GET", url, true);
leke.send();

var lekeplass = [];

var tull = document.getElementById("select");
function listeFunksjon(lekeplass) {
  for(i=0; i<lekeplass.entries.length; i++){
      var option = document.createElement("option");
      option.value = JSON.stringify(lekeplass.entries[i]);
      option.text = lekeplass.entries[i].navn;
      tull.add(option);
      // console.log(option.text);
  }
}


function clickFavourite(leke) {
  var kjørOption = document.getElementById("hemmeligDiv");
  var y = leke;
  kjørOption.innerHTML = "";
  var x = tull.options;
  for(i=0; i<x.length; i++){
    if(x[i].selected === true){
      var alt = JSON.parse(x[i].value);
      kjørOption.innerHTML += "<div>" + "<p>" + "Du valgte " + alt.navn + " som din favorittlekeplass!" + "</p>" + "</br>" +
      "Litt info om denne lekeplassen:" + "</br>" + "ID: " + alt.id + "</br>" +
      "Longitude: " + alt.longitude +
      "</br>" + "Latitude: " + alt.latitude + "</br>" + "Nærmeste toalett: " +  + "</div>";
      console.log(JSON.parse(x[i].value));
    }
    // else {
    //   kjørOption.style.visibility = "hidden";
    // }
  }
}

//Funksjon basert på Haversine formellen for å regne ut distanse
function distance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var radlon1 = Math.PI * lon1/180;
        var radlon2 = Math.PI * lon2/180;
        var t = lon1-lon2;
        var radt = Math.PI * t/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radt);
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          dist = dist * 1.609344;
      document.getElementById('gress').innerHTML = ("Avstanden er " + Math.round(dist*10)/10 + "km");
}

function xVsY(){
  var korteste;
  var vinnern;
//  var kjøttpølse = selected.latitude, selected.longitude;
  toaletter.forEach(function(element){
    var mellomkuk = distance(kjøttpølse,element.latitude, elelemnt.longitude);
    if(korteste == undefined){
      korteste = mellomkuk;
      vinnern = element;
    }
    else if(mellomkuk < korteste){
      korteste = mellomkuk;
      vinnern = element;
    }
  })
  console.log(vinnern);
}
