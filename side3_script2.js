// Odin skrev dette

var pippoTekst =
'<div id="innhold1">'+
'<div id="tekst1">'+
'<p> Don Pippo er en bar</p>'+
'<p> som holder til like ved en skitten kebab</p>'+
'<p> Her kan du sitte alene som illustrert på bildet</p>'+
'</div>'+
'<img src="../img/pippobilde.jpg" alt="bilde av Don Pippo">'+
'</div>';

var garageTekst =
'<div id="innhold2">'+
'<div id="tekst1">'+
'<p> Garage er et høl med gamle menn,</p>'+
'<p> som antaster andre menn mot deres vilje.</p>'+
'</div>'+
'<img src="../img/garagebilde.jpg" alt="bilde av Garagelogo">'+
'</div>';

var ricksTekst =
'<div class="innhold3">'+
'<p><b>Ricks</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>'+
'</div>'+
'<div class="right">'+
'<img id="boxing" src="../img/ricksbilde.png" alt="bilde av Ricks">'+
'</div>'+
'</div>';

var stressTekst =
'<div id="innhold4">'+
'<div id="tekst1">'+
'<p> No Stress serverer drinker for menn</p>'+
'<p> som ikke er redd for å være i kontakt med</p>'+
'<p> sin feminine side.</p>'+
'</div>'+
'<img src="../img/Gurden Ramser.png" alt="bilde av Gurden Ramser">'+
'</div>';

var biskopenTekst =
'<div id="innhold5">'+
'<div id="tekst1">'+
'<p> Biskopen serverer sterke shots</p>'+
'<p> til unge Sollohub, selv om han ikke er gammel nok</p>'+
'</div>'+
'<img src="../img/biskopenInfo.jpg" alt="bilde av Biskopen">'+
'</div>';

/*Funksjonene under endrer innholdet i <div id="pageContent">*/
function pippoKlikk(){
document.getElementById("innhold3").innerHTML = (pippoTekst);
};

function garageKlikk(){
document.getElementById("innhold3").innerHTML = (garageTekst);
}

function ricksKlikk(){
document.getElementById("innhold3").innerHTML = (ricksTekst);
}

function stressKlikk(){
document.getElementById("innhold3").innerHTML = (stressTekst);
}

function biskopenKlikk(){
document.getElementById("innhold3").innerHTML = (biskopenTekst);
}
