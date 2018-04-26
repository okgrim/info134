var leke = new XMLHttpRequest;
var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
leke.onreadystatechange = function(){
  if(leke.readyState === 4 && this.status === 200){
    var ferdig = JSON.parse(leke.responseText);
    var liste = ferdig.entries;
    for(i=0; i < liste.length; i++){
      lekeplass.push(liste[i]);
    }
    console.log(ferdig);
    listeFunksjon(ferdig);
  }
}
leke.open("GET", url, true);
leke.send();

var lekeplass = [];

function listeFunksjon(lekeplass) {
  var tull = document.getElementById("select");
  for(i=0; i<lekeplass.entries.length; i++){
      var option = document.createElement("option");
      option.text = lekeplass.entries[i].navn;
      tull.add(option);
      console.log(option.text);
  }
}

function showFavourite(lekeplass) {
  if(input === lekeplass.entries[i].navn){
    
  }
}
