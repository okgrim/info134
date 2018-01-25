var brannTekst =
'<div>'+
'<p><h2 class="head">Brann Kamp</h2></p>'+
'<p> Bergen sitt største fotballag heter Brann,</p>' +
 '<p>og de spiller i Eliteserien.</p>'+
 '<p>Dersom man ønsker å se på fotball i Bergen,</p>' +
 '<p>så er Brann kamp et fint alternativ.<br> <br></p>'+
 '<p>Her kan du se et bilde fra Stadion på kampdag:</p>'+
  '<img id="stadion" src="Brann Stadion.jpg">'+
'</div>';

var fløyenTekst =
'<div>'+
'<p><h2 class="head">Tur på Fløyen</h2></p>'+
'<p> Bergen er kjent for sine 7 fjell. </p>'+
'<p>Et av disse fjellene heter Fløyen, </p>'+
'<p>og har en høyde på 320 moh, og er et svært populært sted.</p>'+
 '<p>Både bergenser og turister å gå på tur.</p>'+
  '<p>Dette skyldes den vakre naturen og flotte utsikten fra toppen.</p>'+
  '<img id="fløyen" src="Fløyen.jpg">'+
'</div>';

var bryggenTekst =
'<div>'+
'<p><h2 class="head"> Bryggen </h2></p>'+
'<p> Bryggen er en av de største turistattraksjonene i Bergen.</p>'+
'<p>Bryggen, som ligger i Bergen Sentrum, var en gang brukt som handelsport på 1400 tallet. </p>'+
'<img id="Bryggen" src="Bryggen.jpg">'+
'</div>';

var fisketorgetTekst =
'<div>'+
'<p><h2 class="head"> Fisketorget </h2></p>'+
'<p> Fisketorget i Bergen sentrum er svært kjent. Her kan man kjøpe fersk fisk og skalldyr,</p>'+
'<p>og spise ved vannet midt i Bergen Sentrum. </p>'+
'<img id="Fisketorget" src="Fisketorget.jpg">'+
'</div>';

var koengenTekst =
'<div>'+
'<p><h2 class="head"> Konserter på Koengen </h2></p>'+
'<p> Koengen er en park i Bergen der mange store konserter blir arrangert.</p>'+
'<p>Blant annet, er det hvor Bergenfest (en stor musikkfestival i Bergen) finner plass.</p>'+
'<p>Senest i sommer spilte den populære Kanadieren "The Weeknd" her. </p>'+
'<img id="Koengen" src="Koengen.jpg">'+
'</div>';

function brannKlikk(){
  document.getElementById("pageContent").innerHTML = (brannTekst);
};

function fløyenKlikk(){
  document.getElementById("pageContent").innerHTML = (fløyenTekst);
}

function bryggenTekst(){
  document.getElementById("pageContent").innerHTML = (bryggenTekst);
}

function fisketorgetKlikk(){
  document.getElementById("pageContent").innerHTML = (fisketorgetTekst);
}

function koengenKlikk(){
  document.getElementById("pageContent").innerHTML = (koengenTekst);
}
