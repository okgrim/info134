var pippoTekst =
'<div id="innhold1">'+
'<div id="tekst1">'+
'<p> Don Pippo er en bar</p>'+
'<p> som holder til like ved en skitten kebab</p>'+
'<p> Her kan du sitte alene som illustrert på bildet</p>'+
'</div>'+
'<img src="pippobilde.jpg">'+
'</div>';

var garageTekst =
'<div id="innhold2">'+
'<div id="tekst1">'+
'<p> Garage er et høl med gamle menn,</p>'+
'<p> som antaster andre menn mot deres vilje.</p>'+
'</div>'+
'<img src="garagebilde.jpg">'+
'</div>';

var ricksTekst =
'<div class="innhold">'+
'<p><b>Ricks</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>'+
'</div>'+
'<div class="right">'+
'<img id="boxing" src="ricksbilde.png">'+
'</div>'+
'</div>';

var stressTekst =
'<div id="innhold4">'+
'<div id="tekst1">'+
'<p> No Stress serverer drinker for menn</p>'+
'<p> som ikke er redd for å være i kontakt med</p>'+
'<p> sin feminine side.</p>'+
'</div>'+
'<img src="Gurden Ramser.png">'+
'</div>';

var biskopenTekst =
'<div id="innhold5">'+
'<div id="tekst1">'+
'<p> Biskopen serverer sterke shots</p>'+
'<p> til unge Sollohub, selv om han ikke er gammel nok</p>'+
'</div>'+
'<img src="ricksbilde.png">'+
'</div>';

/*Funksjonene under endrer innholdet i <div id="pageContent">*/
function pippoKlikk(){
document.getElementById("pageContent").innerHTML = (pippoTekst);
};


function garageKlikk(){
document.getElementById("pageContent").innerHTML = (garageTekst);
}

function ricksKlikk(){
document.getElementById("pageContent").innerHTML = (ricksTekst);
}

function stressKlikk(){
document.getElementById("pageContent").innerHTML = (stressTekst);
}

function biskopenKlikk(){
document.getElementById("pageContent").innerHTML = (biskopenTekst);
}
