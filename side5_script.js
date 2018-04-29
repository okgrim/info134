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
    lekeNavn(ferdig);
  }
}
leke.open("GET", url, true);
leke.send();

var lekeplass = new Array();

function lekeNavn(lekeplass) {
  var kjør = document.getElementById("playgrounds");
  kjør.innerHTML = "";
  for(i=0; i<lekeplass.entries.length; i++){
    kjør.innerHTML += "<div>" + "<p id='hehe'>" + "Lekeplass nr " + (i+1) + ") " +
    lekeplass.entries[i].navn + "</p>" +  "Long: " + lekeplass.entries[i].longitude +
    "  |  Lat: " + lekeplass.entries[i].latitude + "  |  ID: "
    + lekeplass.entries[i].id + "</br>" + "</div>";
  }
}
