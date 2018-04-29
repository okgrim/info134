

var toaletter = [];

var parset;

function urlHandler(url){
  return new Promise(function(resolve,reject){
    var tempel = new XMLHttpRequest();
    tempel.open("GET", url)
    tempel.onreadystatechange = function(){
      if (tempel.readyState === 4){
        if (tempel.status === 200) {
        resolve(tempel.responseText);
      } else {
        reject(null);
      }
    };
  }
    tempel.send();
  });
}

function hentToalett() {
  var listen;
  var urlen = "http://hotell.difi.no/api/json/bergen/dokart?";
  var verdi = urlHandler(urlen);
  verdi.then(JSON.parse)
  .then(function(value){
    listen = value.entries;
    for(var i = 0; i < listen.length;i++){
      toaletter.push(listen[i]);
    }
    emptyValues();
    splitToalett();
    ordListeSjekk();
  });
  listeVisning(toaletter);
}

// HER KOMMER SØKET
function SearchCriteria (){
  this.freetext = "";
  this.gender = undefined;
  this.wheelchair = undefined;
  this.openNow = undefined;
  this.open = undefined;
  this.nursery = undefined;
  this.maxPrice = undefined;
  this.free = undefined;
}

// En funksjon som går inn i et SearchCriteria-objekt og filtrerer toalett
// i den globale toalettlisten som ikke er i samsvar med brukerens søk.
function sjekk(element) {
  var listen = toaletter;
// Problem: hvis det er mellomrom i freetexten, vil den ikke fungere skikkelig.
  if(crit.freetext){
    // freeTextSpace();
    listen = listen.filter(toalett =>
    ((toalett.plassering.includes(crit.freetext))
    ||(toalett.place.includes(crit.freetext))
    ||(toalett.adresse.includes(crit.freetext))));
  }
  if((crit.gender) || (document.getElementById("male").checked)){
    if(crit.gender == "man"||"male"||"mann"||"menn"||"herre"){
    listen = listen.filter(toalett => toalett.herre != "NULL");
    }
  }
  if((crit.gender) || (document.getElementById("female").checked)){
    if(crit.gender == "female"||"ladies"||"woman"||"kvinne"||"dame"){
    listen = listen.filter(toalett => toalett.dame != "NULL");
    }
  }
  if((document.getElementById("male").checked) && (document.getElementById("female").checked)){
    listen = listen.filter(toalett => toalett.dame != "NULL" && toalett.herre != "NULL");
  }
  if(crit.openNow || document.getElementById("openNow").checked){
    listen = tidsFiltrering();
  }
  if(crit.open || document.getElementById("open").checked){
    listen = openWhen();
  }
  if(crit.wheelchair || document.getElementById("wheelchair").checked){
    listen = listen.filter(toalett => toalett.rullestol != "NULL");
  }
  if(crit.nursery || document.getElementById("nursery").checked){
    listen = listen.filter(toalett => toalett.stellerom != "NULL");
  }
  if(crit.free || document.getElementById("free").checked){
    listen = listen.filter(toalett => Number(toalett.pris) === 0);
  }
  if(crit.maxPrice){
    listen = listen.filter(toalett => Number(toalett.pris) <= Number(crit.maxPrice));
  }
  var hasInput = document.getElementById("maxPrice");
  if(hasInput.value != "" && !(crit.free)){
    listen = listen.filter(toalett => Number(toalett.pris) <= Number(hasInput.value));
  }
  reduserListe(listen);
  listeVisning(listen);
}

function emptyValues(){
  for(i = 0; i < toaletter.length; i++){
    if(toaletter[i].pris == "NULL"){
      toaletter[i].pris = "0";
    }
    if(toaletter[i].herre.length == 0){
      toaletter[i].herre.length = "NULL"
    }
    if(toaletter[i].dame.length == 0){
      toaletter[i].dame.length = "NULL"
    }
    if(toaletter[i].pissoir_only.length == 0){
      toaletter[i].pissoir_only.length = "NULL"
    }
    if(toaletter[i].stellerom.length == 0){
      toaletter[i].stellerom = "NULL";
    }
    if(toaletter[i].rullestol.length == 0){
      toaletter[i].rullestol = "NULL";
    }
  }
}


//I freetext feltet i SearchCriteria-objektet lager vi en liste med alle ord som
//blir separert med et mellomrom, som da vil sammenlignes med tekst-verdiene
//i feltene plassering, adresse og place i toalletlisten. Hvis like tekstverdier
//på begge plasser, vil vi returnere dette toalett-objektet.

// En funksjon som går inn i den globale toalettlisten, splitter og putter
// i egne lister alle ord som går under plassering, place og adresse.
// Ordene i listene blir også gjort om til små bokstaver.
function splitToalett(){
  for(i = 0; i < toaletter.length; i++){
    toaletter[i].plassering = toaletter[i].plassering.toLowerCase();
    toaletter[i].adresse = toaletter[i].adresse.toLowerCase();
    toaletter[i].place = toaletter[i].place.toLowerCase();

    toaletter[i].plassering = toaletter[i].plassering.split(" ");
    toaletter[i].adresse = toaletter[i].adresse.split(" ");
    toaletter[i].place = toaletter[i].place.split(" ");

    if(toaletter[i].plassering.length > 1){
      var str = "";
      str = toaletter[i].plassering.join(" ");
      toaletter[i].plassering.push(str);
    }
    if(toaletter[i].adresse.length > 1){
      var str = "";
      str = toaletter[i].adresse.join(" ");
      toaletter[i].adresse.push(str);
    }
    if(toaletter[i].place.length > 1){
      var str = "";
      str = toaletter[i].place.join(" ");
      toaletter[i].place.push(str);
    }
  }
  return toaletter;
}

function ordListeSjekk() {
  var kommaRegExp = /^,$/g;
  var kommaRegExp1 = /,$/g;
  var kommaRegExp2 = / , /g;
  var kommaRegExp3 = /, /g;

  for(i = 0; i < toaletter.length; i++){
    for(x = 0; x < toaletter[i].plassering.length; x++){
      if(toaletter[i].plassering[x].match(kommaRegExp)){
        toaletter[i].plassering.splice(x, 1);
      }
      if(toaletter[i].plassering[x].match(kommaRegExp1)){
        toaletter[i].plassering[x] = toaletter[i].plassering[x].replace(kommaRegExp1, "");
      }
      if(toaletter[i].plassering[x].match(kommaRegExp2)){
        toaletter[i].plassering[x] = toaletter[i].plassering[x].replace(kommaRegExp2, " ");
      }
      if(toaletter[i].plassering[x].match(kommaRegExp3)){
        toaletter[i].plassering[x] = toaletter[i].plassering[x].replace(kommaRegExp3, " ");
      }
    }
  }
  for(i = 0; i < toaletter.length; i++){
    for(x = 0; x < toaletter[i].place.length; x++){
      if(toaletter[i].place[x].match(kommaRegExp)){
         toaletter[i].place.splice(x, 1);
      }
      if(toaletter[i].place[x].match(kommaRegExp1)){
        toaletter[i].place[x] = toaletter[i].place[x].replace(kommaRegExp1, "");
      }
      if(toaletter[i].place[x].match(kommaRegExp2)){
        toaletter[i].place[x] = toaletter[i].place[x].replace(kommaRegExp2, " ");
      }
      if(toaletter[i].place[x].match(kommaRegExp3)){
        toaletter[i].place[x] = toaletter[i].place[x].replace(kommaRegExp3, " ");
      }
    }
  }
  for(i = 0; i < toaletter.length; i++){
    for(x = 0; x < toaletter[i].adresse.length; x++){
      if(toaletter[i].adresse[x].match(kommaRegExp)){
         toaletter[i].adresse.splice(x, 1);
      }
      if(toaletter[i].adresse[x].match(kommaRegExp1)){
        toaletter[i].adresse[x] = toaletter[i].adresse[x].replace(kommaRegExp1, "");
      }
      if(toaletter[i].adresse[x].match(kommaRegExp2)){
        toaletter[i].adresse[x] = toaletter[i].adresse[x].replace(kommaRegExp2, " ");
      }
      if(toaletter[i].adresse[x].match(kommaRegExp3)){
        toaletter[i].adresse[x] = toaletter[i].adresse[x].replace(kommaRegExp3, " ");
      }
      if(toaletter[i].adresse[x].match(/^\d+$/g)){
        toaletter[i].adresse.splice(x,1);
      }
    }
  }
}

//Lager en utvidelse av searchCriteria, som er en funskjon
//som går gjennom teksten skrevet i søkefeltet og sjekker
//om den matcher med regExp uttrykkene satt for de forskjellige søkeverdiene.
//Hvis teksten matcher, endrer den tilstanden til søkeveridene
//i searchCriteria.
SearchCriteria.prototype.setText = function (text) {
  var genderMatch = text.match(this.genderRegExp);
  var wheelchairMatch = text.match(this.wheelchairRegExp);
  var openNowMatch = text.match(this.openNowRegExp);
  var openMatch = text.match(this.openRegExp);
  var nurseryMatch = text.match(this.nurseryRegExp);
  var maxPriceMatch = text.match(this.maxPriceRegExp);
  var freeMatch = text.match(this.freeRegExp);
  var freeTextMatch = text.match(this.freeTextRegExp)


  if(genderMatch){
    this.gender = genderMatch[1];
    text = text.replace(this.genderRegExp, "");
  } else {
    this.gender = undefined;
  }

    if(wheelchairMatch){
    this.wheelchair = wheelchairMatch[1];
    text = text.replace(this.wheelchairRegExp, "");
  } else {
    this.wheelchair = undefined;
  }

    if(openNowMatch){
    this.openNow = openNowMatch[1];
    text = text.replace(this.openNowRegExp, "");
  } else {
    this.open = undefined;
  }

    if(openMatch){
    this.open = openMatch[1];
    text = text.replace(this.openRegExp, "");
  } else {
    this.open = undefined;
  }

    if(nurseryMatch){
    this.nursery = nurseryMatch[1];
    text = text.replace(this.nurseryRegExp, "");
  } else {
    this.nursery = undefined;
  }

    if(maxPriceMatch){
    this.maxPrice = maxPriceMatch[1];
    text = text.replace(this.maxPriceRegExp, "");
  } else {
    this.maxPrice = undefined;
  }

    if(freeMatch){
    this.free = freeMatch[1];
    text = text.replace(this.freeRegExp, "");
  } else {
    this.free = undefined;
  }

    this.freetext = text;
    if(freeTextMatch){
    this.freetext = text.trim();
  }
    else {
    this.freetext = text;
  }
}

SearchCriteria.prototype.genderRegExp = /(mann|male|man|herre|female|woman|ladies|kvinne|dame)/;
SearchCriteria.prototype.wheelchairRegExp = /(rullestol|hc|handicap|wheelchair)/;
SearchCriteria.prototype.openNowRegExp = /(openNow|åpenNå)/;
SearchCriteria.prototype.openRegExp = /(\d\d(\.|\:|)\d\d)/;
SearchCriteria.prototype.nurseryRegExp = /(stellerom|nursery)/;
SearchCriteria.prototype.maxPriceRegExp = /maxPrice:(\d+)/;
SearchCriteria.prototype.freeRegExp = /(gratis|free)/;
SearchCriteria.prototype.freeTextRegExp = /^(\s+)?((\w+|\W+)+)?(\s+)?$/g;

var crit = new SearchCriteria();

//En funskjon som "scanner" søkefeltet i html-filen og skriver ut inputen
//i searchCriteria-objektet.
function scan() {
  crit.setText(document.getElementById("search").value);
  console.log(crit);
}



// SØK SLUTTER


var markers = [];


function listeVisning(liste){
  var tjohei = document.getElementById("smør");
  tjohei.innerHTML = "";
  var i = 0;
  liste.forEach(function(toalett) {
  i++;
  tjohei.innerHTML += "<li>" + "toalett " + i +" ved " + "<a id='toalettlenke' onclick='klikkern(" + (i) + ")'>" + toalett.place[toalett.place.length - 1] + "</a></li>" + ("</br>");
});
}



function launch(){
  hentToalett();
 setTimeout(function(){listeVisning(toaletter);sjekk();},200);
 //setTimeout(function(){document.getElementById("maxPrice").value = "";},0);
// venter på at HTTP-forespørselen går igjennom før den kjører listevisningen
}

window.onload = launch();

function initMap() {
  var infowindow = new google.maps.InfoWindow();
  var bergen = {lat: 60.392209, lng: 5.324011};
  var map = new google.maps.Map(document.getElementById('googlemap'), {
    zoom: 13,
    center: bergen
  });
  infoWindow = new google.maps.InfoWindow;


  for(var i = 0; i < toaletter.length; i++){
      var latLng = new google.maps.LatLng(toaletter[i].latitude, toaletter[i].longitude);
      var contentString = toaletter[i].id + ". " + toaletter[i].place[toaletter[i].place.length -1];

      marker = new google.maps.Marker({
            position: latLng,
            label: toaletter[i].id,
            map: map,
            contentString: contentString
      });




      marker.addListener('click', function() {
             infowindow.setContent(this.contentString);
             infowindow.open(map, this);
             map.setCenter(this.getPosition());
       });
           markers.push(marker);
  }
}
// Benytter seg av Markers arrayet for å kunne referere til spesifikke iWindows
function klikkern(i){
  google.maps.event.trigger(markers[i-1], 'click');
}


// Viser/skjuler avanserte valg for søk
function visAvansert(){
  var innholdet = document.getElementById("toggle");
  if(innholdet.style.display === "none"){
    innholdet.style.display = "flex";
    }
      else {
        innholdet.style.display = "none";
      }
}



 //Klokke Under kopiert fra W3Schools
 function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//  Logger ut og returnerer tiden. Filter for alternativ tidsvisning.
function getTime(){
  var filteret = /(\d\d)(:)(\d\d)(:)(\d\d)?/;
  var tiden = document.getElementById('txt').innerHTML;
  return tiden;
  console.log(tiden);
}

//Finner ukedagstallet og setter verdi av uke/lør/søn. Brukes i tidssøk.
function dagen() {
    var d = new Date();
    var n = d.getDay()
    var x;
    if(n > 0 && n <=5){
      x = "uke";
    }
    if(n == 6) {
      x = "lør";
    }
    if(n == 0) {
      x = "søn";
    }
    return x;
}



//reduserListe() kalles av alle søkefunksjoner, og tømmer markerlista for så å fylle den opp med de nye resultatene
function reduserListe(list){
  markers = [];
  var listen = list;
  var infowindow = new google.maps.InfoWindow();
  var bergen = {lat: 60.392209, lng: 5.324011};
  var map = new google.maps.Map(document.getElementById('googlemap'), {
    zoom: 13,
    center: bergen
  });
  infoWindow = new google.maps.InfoWindow;
  for(var i = 0; i < listen.length; i++){
      var latLng = new google.maps.LatLng(listen[i].latitude, listen[i].longitude);
      var contentString = listen[i].id + ". " + listen[i].place[listen[i].place.length -1];

      marker = new google.maps.Marker({
            position: latLng,
            label: (i+1).toString(),
            map: map,
            contentString: contentString
      });




      marker.addListener('click', function() {
             infowindow.setContent(this.contentString);
             infowindow.open(map, this);
             map.setCenter(this.getPosition());
       });
           markers.push(marker);
  }
}



// Henter nåtid og returnerer det som en tallvariabel. Brukes av tidsfiltrering(). -Odin
function tiden(){
  var tidspunkt = Number(getTime().replace(/(\:|\.)/g,""));
  return tidspunkt;
  }

/* Henter ut ukens dag, og basert på resultatet looper igjennom toalettlisten,
og sjekker om verdien for åpningstiden er større enn nåtid. Hvis ja, push til lista[],
som igjen brukes av sjekk()  -Odin
*/
function tidsFiltrering(){
  var lista = [];
  var x = filterFix();
  var tidspunkt = tiden();
  var toalettet;
  var kriteriet = /(\d\d)\.(\d\d)\s\-\s(\d\d)\.(\d\d)/;
  var toanTest;

  for (var i = 0; i < toaletter.length; i++) {
    if (toaletter[i][x] != "NULL"){// kriterie: åpningstiden er ikke NULL/stengt
      if(toaletter[i][x] == "ALL"){// Kriterie: Åpningstiden er ALL/døgnåpen
        lista.push(toaletter[i]);
      }
      else { //Hvis ikke døgnåpen eller stengt, sjekk siste time+minutt mot nåtid time+minutt
        toalettet = toaletter[i][x];
        toan = kriteriet.exec(toalettet);
        toanTest = Number(toan[3]+toan[4]);
        if(toanTest >= tidspunkt){
          lista.push(toaletter[i]);
        }

      }
      }
    }
    return lista;
  }

//Via dagen() får vi en verdi som gjøres om til en matchende string for variabel-navnene i toaletter[].
// Egentlig overflødig, ettersom dagen() kunne ha hatt det, men skal brukes til andre ting også. -Odin
function filterFix(){
  var uke = dagen();
  var listeKriteriet;
      if(uke == "uke"){
        listeKriteriet = "tid_hverdag";
      }
      else if (uke == "lør") {
        listeKriteriet = "tid_lordag";
      }
      else if (uke == "søn") {
        listeKriteriet = "tid_sondag";
      }
  return listeKriteriet;
}

function openWhen(){
  var x = filterFix();
  var kriteriet = /(\d\d)\.(\d\d)\s\-\s(\d\d)\.(\d\d)/;
  var lista = [];
  var tidspunkt = Number(crit.open.replace(/(\.|\s|\:)/,""));

  for (var i = 0; i < toaletter.length; i++) {
      if (toaletter[i][x] != "NULL"){// kriterie: åpningstiden er ikke NULL/stengt
        if(toaletter[i][x] == "ALL"){// Kriterie: Åpningstiden er ALL/døgnåpen
          lista.push(toaletter[i]);
        }
        else { //Hvis ikke døgnåpen eller stengt, sjekk siste time+minutt mot nåtid time+minutt
          toalettet = toaletter[i][x];
          toan = kriteriet.exec(toalettet);
          toanMin = Number(toan[1]+toan[2]);
          toanMax = Number(toan[3]+toan[4]);
          if(toanMin <= tidspunkt && toanMax > tidspunkt){
            lista.push(toaletter[i]);
          }

        }
      }
    }
    return lista;
}
