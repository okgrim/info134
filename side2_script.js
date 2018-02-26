// Harald skrev dette

var brannTekst =
'<div class="venstre">'+
'<div class="innhold">'+
'<p><h1>Brann Kamp</h1></p>'+
'<p> Bergen sitt største fotballag heter Brann, og de spiller i Eliteserien</p>' +
'<p>Dersom man ønsker å se på fotball i Bergen, så er Brann kamp et fint alternativ.<br> <br></p>' +
'<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'+
'<p>  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>'+
'<p>  enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>'+
'<p>  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>'+
'<p>  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>'+
'<p>  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in</p>'+
'<p>  culpa qui officia deserunt mollit anim id est laborum. </p>'+
'</div>'+
'</div>'+
'<div class="høyre">'+
'<img id="stadion" src="../img/Brann Stadion.jpg" alt="Bilde av Brann Stadion">' +
'</div>';

var fløyenTekst =
'<div class="venstre">'+
'<div class="innhold">'+
'<p><h1>Tur på Fløyen</h1></p>'+
'<p> Bergen er kjent for sine 7 fjell. Et av disse fjellene heter Fløyen, og har en høyde på 320 moh</p>'+
'<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'+
'<p>  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>'+
'<p>  enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>'+
'<p>  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>'+
'<p>  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>'+
'<p>  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in</p>'+
'<p>  culpa qui officia deserunt mollit anim id est laborum. </p>'+
'<p>Dette skyldes den vakre naturen og flotte utsikten fra toppen.</p>'+
'</div>'+
'</div>'+
'<div class="høyre">'+
'<img id="fløyen" src="../img/Fløyen.jpg" alt="Bilde av Fløyen">'+
'</div>';

var bryggenTekst =
'<div class="venstre">'+
'<div class="innhold">'+
'<p><h1> Bryggen </h1></p>'+
'<p> Bryggen er en av de største turistattraksjonene i Bergen.</p>'+
'<p>Bryggen, som ligger i Bergen Sentrum, var en gang brukt som handelsport på 1400 tallet. </p>'+
'<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'+
'<p>  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>'+
'<p>  enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>'+
'<p>  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>'+
'<p>  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>'+
'<p>  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in</p>'+
'<p>  culpa qui officia deserunt mollit anim id est laborum. </p>'+
'<p>Dette skyldes den vakre naturen og flotte utsikten fra toppen.</p>'+
'</div>'+
'</div>'+
'<div class="høyre">'+
'<img id="Bryggen" src="../img/Bryggen.jpg" alt="Bilde av Bryggen">'+
'</div>';

var fisketorgetTekst =
'<div class="venstre">'+
'<div class="innhold">'+
'<p><h1> Fisketorget </h1></p>'+
'<p> Fisketorget i Bergen sentrum er svært kjent. Her kan man kjøpe fersk fisk og skalldyr, og spise ved vannet midt i Bergen Sentrum. </p>'+
'<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'+
'<p>  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>'+
'<p>  enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>'+
'<p>  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>'+
'<p>  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>'+
'<p>  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in</p>'+
'<p>  culpa qui officia deserunt mollit anim id est laborum. </p>'+
'<p>Dette skyldes den vakre naturen og flotte utsikten fra toppen.</p>'+
'</div>'+
'</div>'+
'<div class="høyre">'+
'<img id="Fisketorget" src="../img/Fisketorget.jpg" alt="bilde av Fisketorget">'+
'</div>';

var koengenTekst =
'<div class="venstre">'+
'<div class="innhold">'+
'<p><h1> Konserter på Koengen </h1></p>'+
'<p> Koengen er en park i Bergen der mange store konserter blir arrangert.</p>'+
'<p>Blant annet, er det hvor Bergenfest (en stor musikkfestival i Bergen) finner plass.</p>'+
'<p>Senest i sommer spilte den populære Kanadieren "The Weeknd" her. </p>'+
'<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'+
'<p>  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>'+
'<p>  enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>'+
'<p>  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p>'+
'<p>  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla</p>'+
'<p>  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in</p>'+
'<p>  culpa qui officia deserunt mollit anim id est laborum. </p>'+
'<p>Dette skyldes den vakre naturen og flotte utsikten fra toppen.</p>'+
'</div>'+
'</div>'+
'<div class="høyre">'+
'<img id="Koengen" src="../img/Koengen.jpg" alt="Bilde av Koengen">'+
'</div>';

function brannKlikk(){
  document.getElementById("pageContent").innerHTML = (brannTekst);
};

function fløyenKlikk(){
  document.getElementById("pageContent").innerHTML = (fløyenTekst);
}

function bryggenKlikk(){
  document.getElementById("pageContent").innerHTML = (bryggenTekst);
}

function fisketorgetKlikk(){
  document.getElementById("pageContent").innerHTML = (fisketorgetTekst);
}

function koengenKlikk(){
  document.getElementById("pageContent").innerHTML = (koengenTekst);
}

for(var i = 1; i < 11; i += 1) {
      console.log(i);
  }
