
function urlHandler(url){ //Funksjon som tar i mot URL, kalles av hentDatasett()
  return new Promise(function(resolve,reject){//Benytter seg av løfter, for å returnere enten innholdet/responsetext hvis get-
    //forespørselen får 200 og readystate= 4, eller returnerer feil uansett ellers.
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

var datasettListe = []; // Array for hele datasettet. Ligger globalt for mange funksjoner benytter seg av dette.

function hentDatasett() {//Fôrer urlHandler med en URL, for så å pushe de ferdig parsede elementene til dataSettliste
  var listen;
  var urlen = "https://hotell.difi.no/api/json/nrk/norge-rundt?";
  var verdi = urlHandler(urlen);
  verdi.then(JSON.parse)
  .then(function(value){
    listen = value.entries; //Fjerner leddet "entries" fra arrayet, slik at det blir lettere å bruke .
    for(var i = 0; i < listen.length;i++){
      datasettListe.push(listen[i]);
    }
  });
}

/*
* En funksjon som utføres når nettsiden starter.
*/
function launch(){ // skal kalles på window.onload, og setter opp burgermenyen, henter datasettet og "tegner" det ut til slutt.
  hamburger();
  hentDatasett();
  setTimeout(function(){temaSort();},200); // sett timeout er fordi hentingen ikke er momentan, Har måttet variere utifra nettkvalitet, men denne funkerer 90% av tiden
}

window.onload = launch();

var temaObjekt = {}; // Objekt som skal holde alle instanser av Norge rundt episoder, da sortert etter tema

function temaSort(){ // Sorterer datasettet etter feltet "tema".
  clearText(); // tøm alle tekstområder som nå skal skrives til
  var ordListe = []; // ordliste som skal sørge for at det ikke forekommer duplikater.
  for (var i = 0; i < datasettListe.length; i++) { // looper igjennom datasettet, og legger til alle treff én gang i ordlisten.
    if(!ordListe.includes(datasettListe[i].tema)){
      ordListe.push(datasettListe[i].tema);
      //console.log(ordListe);
      }
    }
    ordListe.forEach(function(name){
      temaObjekt[name] = []; // oppretter et array for hvert unike tema i ordlisten. (bruker name for å ikke ha "temax1000")
      var node = document.createElement("li"); // Oppretter liste-elementer i HTML-dokumentet
      var textnode = document.createTextNode(name); // Setter teksten til å være lik episodens tema-streng
      node.appendChild(textnode); // appender tekstnoden til listenoden.
      node.href = "#"
      node.onclick = function(){vis(temaObjekt[name])}; //Gir noden en onclick-funksjon som skal vise alle episodene under samme tema. (se vis())
      document.getElementById("kategori").appendChild(node); // appender noden som barn i gitte HTML-element
    });
    for (var i = 0; i < datasettListe.length; i++) { // Føyer til episodene til riktig temaArray i temaObjektet.
      var tema = datasettListe[i].tema;
      temaObjekt[tema].push(datasettListe[i]);
    }
}

function vis(x){// Skriver innholdet i listen den blir tildelt i dokumentet. Brukes til å vise episodene under gitte kategori/kommune
  var plakat = document.getElementById("visningen");
  plakat.innerHTML = "<b>Velg en episode:</b>";
  x.forEach(function(element){
    var node = document.createElement("li");
    var textnode = document.createTextNode(element.tittel);
    node.appendChild(textnode);
    node.href = "#"
    node.onclick = function(){
      beskrivelse(element);
      genderSplit(element);
      document.getElementById('avspiller').src = element.video_url;
      (element.kommune)
    };
    plakat.appendChild(node);
  })
  }

  function beskrivelse(x){ // Legger ved en tekstbesrivelse til valgte episode-element, basert på tittel, kommune og kjønnsfordeling
    her = document.getElementById('describe');
    for(var key in x){
      if(x.key != ""){
      }
    }
    her.innerHTML = "Episoden " + '"' + x.tittel + '"' + " finner sted i " + x.kommune;
    her.innerHTML += "</br> Fordelingen av menn til kvinner i denne episoden er: ";
  }

  function genderSplit(x){ // En overflødig men artig måte å tegne opp prosenten av mann-til-kvinne forholdet i episoden.
    var q = 0;
    var m = 0;
    if(x.antall_kvinner != "" && !undefined && !null){
      var q = Number(x.antall_kvinner)
    }
    if(x.antall_menn != "" && !undefined && !null){
      var m = Number(x.antall_menn)
    }
      if(q == 0){
        document.getElementById("col1").style.width = 100+'%'; // Endrer prosenten for bredde (i stilen til HTML elementet) for å skape en "graf" og endrer tilhørende tekst
        document.getElementById("col1").innerHTML = 100+'%';
      } if (m == 0) {
        document.getElementById("col2").style.width = 100+'%';
        document.getElementById("col2").innerHTML = 100+'%';
      } else {
    document.getElementById("col1").style.width = (m/(m+q))*100+'%';
    document.getElementById("col1").innerHTML = Math.round((m/(m+q))*100)+'%';
    document.getElementById("col2").style.width = (q/(m+q))*100+'%';
    document.getElementById("col2").innerHTML = Math.round((q/(m+q))*100)+'%';
    }
  }

var kommuneObjekt = {} //Tilsvarende objekt for Kommunesortering som temaObjektet.
  function kommuneBrowse(){ // motparten til temaSort()
    document.getElementById('switchen').innerHTML = "Let igjennom kommuner alfabetisk";
    clearText();
    var kommuneListe = []; // Tilsvarende som ordliste i temaSort
    var alfabetisk = []; //liste for alle forekommende forbokstaver til kommunene i listen. Ingen duplikater
    datasettListe.forEach(function(element){
      if(!kommuneListe.includes(element.kommune)){
        kommuneListe.push(element.kommune);
      }
    })
    kommuneListe.sort();
    kommuneListe.forEach(function(element){
      if(!alfabetisk.includes(element.charAt(0))){ // sjekker første bokstav på elementet i kommuneListen for å generere alfabetisk oversikt
        alfabetisk.push(element.charAt(0));
      }
    })
    alfabetisk.forEach(function(bokstav){
      kommuneObjekt[bokstav] = [];
      datasettListe.forEach(function(element){
        if(element.kommune.charAt(0) == bokstav){
          kommuneObjekt[bokstav].push(element);
        }
    })
    var node = document.createElement("li");
    var textnode = document.createTextNode(bokstav);
    node.appendChild(textnode);
    node.href = "#"
    node.onclick = function(){kommuneExpand(kommuneObjekt[bokstav])};
    document.getElementById("herpes").appendChild(node);
  })
}

function kommuneExpand(x){ // Utvider kommune-visningen. Etter valgt bokstav, lar deg velge kommune for så å vise episodene som finner sted her.
  var plakat = document.getElementById("herpes");
  plakat.innerHTML = null;
  plakat.innerHTML = "<button onclick='kommuneBrowse();'>Tilbake</button>"; // knapp for å komme tilbake til alfabetisk liste
  var kListe = [];
  var kObj = {};
  x.forEach(function(element){ // tilsvarende som i temaSort og kommuneBrowse, opprettes det et objekt med arrays for sortering
    if(!kListe.includes(element.kommune)){
      kListe.push(element.kommune);
      kObj[element.kommune] = [];
    }
  })

  x.forEach(function(element){
    Object.keys(kObj).forEach(function(key){ // en annen vri på sortering enn i temaBrowse(), looper igjennom nøkkelnavnene til kObjekt, gjør de til String-elementer,
      // og sjekker om de matcher med elementets kommune-verdi. Hvis ja, legg til i tilhørende array i kObj
      if(key.toString() == element.kommune){
        kObj[key].push(element);
      }
    })
  })


  kListe.forEach(function(element){ // Fôrer vis() med riktig liste for visning av episode-informasjon
    var node = document.createElement("li");
    var textnode = document.createTextNode(element);
    node.appendChild(textnode);
    node.href = "#"
    node.onclick = function(){
      vis(kObj[element]);
    };
    plakat.appendChild(node);
    })
  };



function clearText(){ // en samlende funksjon for å tømme alle tekstområder som er brukt i visningen.
  document.getElementById('describe').innerHTML = null;
  document.getElementById('visningen').innerHTML = null;
  document.getElementById("herpes").innerHTML = null;
  document.getElementById("col1").innerHTML = null;
  document.getElementById("col2").innerHTML = null;
}

/*
* En funksjon som endrer display-tistanden til hamburger-menyen,
* når den blir klikket på.
*/
function hamburger(){
  var x = document.getElementById("li");
  if(x.style.display === "none"){
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
