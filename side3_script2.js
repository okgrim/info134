// Odin skrev dette

var pippoTekst =
'<div class="googleDesc">'+
'<p> Don Pippo er en bar</p>'+
'<p> som holder til like ved en skitten kebab</p>'+
'<p> Her kan du sitte alene som illustrert på bildet</p>'+
'<div id="descBilde">'+
'<img src="../img/pippobilde.jpg" style="width:150px; height:150px;" alt="bilde av Don Pippo">'+
'</div>';

var garageTekst =
'<div class="googleDesc">'+
'<p> Garage er et høl med gamle menn,</p>'+
'<p> som antaster andre menn mot deres vilje.</p>'+
'<div id="descBilde">'+
'<img src="../img/garagebilde.jpg" style="width:150px; height:150px;" alt="bilde av Garagelogo">'+
'</div>';

var ricksTekst =
'<div class="googleDesc">'+
'<p><b>Ricks</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>'+
'<div class="descBilde">'+
'<img src="../img/ricksbilde.png" style="width:200px; height:100px;" alt="bilde av Ricks">'+
'</div>';

var stressTekst =
'<div class="googleDesc">'+
'<p> No Stress serverer drinker for menn</p>'+
'<p> som ikke er redd for å være i kontakt med</p>'+
'<p> sin feminine side.</p>'+
'</div id="descBilde">'+
'<img src="../img/Gurden Ramser.png" style="width:150px; height:150px;" alt="bilde av Gurden Ramser">'+
'</div>';

var biskopenTekst =
'<div class="googleDesc">'+
'<p> Biskopen serverer sterke shots</p>'+
'<p> til unge Sollohub, selv om han ikke er gammel nok</p>'+
'</div id="descBilde">'+
'<img src="../img/biskopenInfo.jpg" style="width:150px; height:150px;" alt="bilde av Biskopen">'+
'</div>';

/*Funksjonene under endrer innholdet i <div id="google">*/
function pippoKlikk(){
document.getElementById("googleDesc").innerHTML = (pippoTekst);
};

function garageKlikk(){
document.getElementById("googleDesc").innerHTML = (garageTekst);
}

function ricksKlikk(){
document.getElementById("googleDesc").innerHTML = (ricksTekst);
}

function stressKlikk(){
document.getElementById("googleDesc").innerHTML = (stressTekst);
}

function biskopenKlikk(){
document.getElementById("googleDesc").innerHTML = (biskopenTekst);
}
