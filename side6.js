// XMLHttpRequest'ene til toalett og lekeplass datasettene
var toalett = new XMLHttpRequest;
var leke = new XMLHttpRequest;

/* Følgende funksjon åpner lekeplass datasettet, parser JSON filen, og pusher
objectene inn i et array(arrayet heter "lekeplass").*/
var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
leke.onreadystatechange = function(){
  // Sjekker at operasjonen er fullført (4), og vellykket(200)
  if(leke.readyState === 4 && this.status === 200){
    // Parser JSON filen og tildeler objectene til variablet ferdig
    var ferdig = JSON.parse(leke.responseText);
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      // pusher objectene til arrayet lekeplass
      lekeplass.push(liste[i]);
    }
    listeFunksjon(ferdig);
  }
}
leke.open("GET", url, true);
leke.send();

/* Samme funksjon som brukes for å åpne, parse, og pushe lekeplass objectene, brukes
her for datasettet over toaletter. Objectene pushes inn i arrayet "toalettliste".*/
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

// Her innitierer vi de globale arrayene for lekeplassene og toalettene
var lekeplass = [];
var toalettliste = [];

/* Initierer variablet "tull" fra select elementet. Varieblet blir gjort globalt
da det skal brukes i flere funksjoner.*/
var tull = document.getElementById("select");
// Funksjonen bruker en for løkke som opretter en ny "option" ved hver iterasjon, og
// tildeler hver option sitt eget lekeplass navn basert på indexen (i).
function listeFunksjon(lekeplass) {
  for(i=0; i<lekeplass.entries.length; i++){
      var option = document.createElement("option");
      option.value = JSON.stringify(lekeplass.entries[i]);
      option.text = lekeplass.entries[i].navn;
      // Når for løkken har kjørt ferdig, skal alle option elementene være lagt til
      // tull variablet. Dette blir dropdown listen med alle lekeplassene.
      tull.add(option);
  }
}

/* Denne funksjonen skal la brukeren velge en favorittlekeplass, og skrive ut hvilken lekeplassen
// du valgte, i tillegg til informasjon om denne lekeplassen.
// Dette er en onchange funksjon, så denne skal utføres når en endring skjer, altså når en
lekeplass er valgt.*/
function clickFavourite(leke) {
  var kjørOption = document.getElementById("hemmeligDiv");
  // Vi skriver her display "block" for å vise den gjemte diven, når en lekeplass er valgt.
  kjørOption.style.display = "block";
  var y = leke;
  kjørOption.innerHTML = "";
  var x = tull.options;
  for(i=0; i<x.length; i++){
    if(x[i].selected === true){ // Hvis lekeplassen x[i] er valgt, kjører den følgende koden...
      var alt = JSON.parse(x[i].value); // Vi parser x[i] slik at vi kan få tak i verdiene til objectet.
      // Nedenfor bruker vi innerHTML for å skrive ut informasjonen om lekeplassen + litt utfyllende tekst.
      kjørOption.innerHTML += "<div>" + "<p id='hehe'>" + "Du valgte " + alt.navn + " som din favorittlekeplass!" + "</p>" +
      "<p id='haha'>" + "Litt info om denne lekeplassen:" + "</p>" + "<div id='høhø'>" + "<b>" +  "ID: " + "</b> "+ alt.id + "</br>" +
      "<b>" + "Longitude: " + "</b>" + alt.longitude +
      "</br>" + "<b>" + "Latitude: " + "</b> "+ alt.latitude + "</br>" + "</div>" + "</div>";
    }
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


function forer(x){//Denne funksjonen fôrer distance() med favorittlekeplassen's koordinater, samt
//looper igjennom alle toalettene og finner minste avstand basert på hvert toaletts koordinater.
  var nærmest = document.getElementById('hemmeligDo');
  nærmest.style.display = "block";
  var selected = x;//variabel som gis fra select/option i HTMLen, og setter favoritten
  var korteste = 1000; //Setter en høy startverdi for å forsikre om at avstanden som gis ut til slutt er innenfor rammene vi vil ha
  var vinneren; //Variabel som til slutt skal holde toalett-objektet som har kortest avstand fra lekeplassen

  var lat1 = Number(selected.latitude);//latLng for favoritten er gitt fra og med forer() kalles
  var lon1 = Number(selected.longitude);

  for(var i = 0; i < toalettliste.length; i++){ // itererer igjennom toalettene, og oppdaterer var vinneren og avstanden hvis
  var lat2 = Number(toalettliste[i].latitude); // de har lavere avstandsverdi enn nåværende vinner/avstand
  var lon2 = Number(toalettliste[i].longitude);
  var attempt = distance(lat1,lon1,lat2,lon2);
  if(attempt < korteste){
    korteste = attempt;
    vinneren = toalettliste[i];
  }
}
  nærmest.innerHTML = "<div id='høhø'>" + "<p id='haha'>" + "Nærmeste toalett er ved: "
  + vinneren.place + "</p>" + "Med gangavstand på " + "<b>" + korteste + " kilometer" + "</b>" + "</div>";
}
