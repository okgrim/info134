var toalett = new XMLHttpRequest;
var leke = new XMLHttpRequest;

var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
leke.onreadystatechange = function(){
  if(leke.readyState === 4 && this.status === 200){
    var ferdig = JSON.parse(leke.responseText);
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      lekeplass.push(liste[i]);
    }
    listeFunksjon(ferdig);
  }
}
leke.open("GET", url, true);
leke.send();

var url = "https://hotell.difi.no/api/json/bergen/dokart?";
toalett.onreadystatechange = function(){
  if(toalett.readyState === 4 && this.status === 200){
    var ferdig = JSON.parse(toalett.responseText);
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      toalettliste.push(liste[i]);
    }
  }
}
toalett.open("GET", url, true);
toalett.send();

var lekeplass = [];
var toalettliste = [];

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
      "</br>" + "Latitude: " + alt.latitude + "</br>" + "</div>";
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
          return Math.round(dist*10)/10;
}


var avstandsListe = [];

function forer(x){
  var selected = x;
  var korteste = 1000;
  var vinneren;

  var lat1 = Number(selected.latitude);
  var lon1 = Number(selected.longitude);


  for(var i = 0; i < toalettliste.length; i++){
  var lat2 = Number(toalettliste[i].latitude);
  var lon2 = Number(toalettliste[i].longitude);
  var attempt = distance(lat1,lon1,lat2,lon2);
  if(attempt < korteste){
    korteste = attempt;
    vinneren = toalettliste[i];
  }
}
  document.getElementById('hemmeligDo').innerHTML = "Nærmeste toalett er: " + vinneren.place + "</br>" + "Med gangavstand på " + korteste + " kilometer";


}
