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
'<div id="innhold3">'+
'<div id="tekst1">'+
'<p> Ricks er stedet for deg</p>'+
'<p> som ønsker å tafse på mindreårige</p>'+
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
