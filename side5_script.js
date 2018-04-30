var leke = new XMLHttpRequest; // XMLHttpRequest som skal brukes for å hente lekeplass datasettet
var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
leke.onreadystatechange = function(){
  // Sjekker at operasjonen er fullført (4), og vellykket(200)
  if(leke.readyState === 4 && this.status === 200){
    var ferdig = JSON.parse(leke.responseText); // Parser JSON filen
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      lekeplass.push(liste[i]); // Pusher objectene fra datasettet inn i lekeplass arrayet
    }
    console.log(ferdig);
    lekeNavn(ferdig); // Kjører lekeNavn funksjonen
  }
}
leke.open("GET", url, true);
leke.send();

var lekeplass = []; // Initierer arrayet

/* Denne funksjonen skal iterere gjennom hele datasettet til lekeplassene, og kjøre ut informasjon
om hver lekeplass ved bruk av innerHTML*/
function lekeNavn(lekeplass) {
  var kjør = document.getElementById("playgrounds"); // Henter elementet der informasjonen skal skrives ut
  kjør.innerHTML = ""; // Setter elementet til null
  for(i=0; i<lekeplass.entries.length; i++){ // For løkken som lar oss itererer gjennom hele datasettet
    // Nedenfor skrives ut informasjonen om lekeplassene med litt utfyllende tekst ved bruk av innerHTML
    kjør.innerHTML += "<div>" + "<p id='hehe'>" + "Lekeplass nr " + (i+1) + ") " +
    lekeplass.entries[i].navn + "</p>" +  "Long: " + lekeplass.entries[i].longitude +
    "  |  Lat: " + lekeplass.entries[i].latitude + "  |  ID: "
    + lekeplass.entries[i].id + "</br>" + "</div>";
  }
}
