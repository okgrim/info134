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

var datasettListe = [];

function hentDatasett() {
  var listen;
  var urlen = "https://hotell.difi.no/api/json/nrk/norge-rundt?";
  var verdi = urlHandler(urlen);
  verdi.then(JSON.parse)
  .then(function(value){
    listen = value.entries;
    for(var i = 0; i < listen.length;i++){
      datasettListe.push(listen[i]);
    }
  });
}

function launch(){
  hentDatasett();
  setTimeout(function(){temaSort();},200);
}

window.onload = launch();



var temaObjekt = {};

function temaSort(){
  clearText();
  var ordListe = [];
  for (var i = 0; i < datasettListe.length; i++) {
    if(!ordListe.includes(datasettListe[i].tema)){
      ordListe.push(datasettListe[i].tema);
      //console.log(ordListe);
      }
    }
    ordListe.forEach(function(name){
      temaObjekt[name] = [];
      var node = document.createElement("li");
      var textnode = document.createTextNode(name);
      node.appendChild(textnode);
      node.href = "#"
      node.onclick = function(){vis(temaObjekt[name])};
      document.getElementById("herpes").appendChild(node);
    });
    for (var i = 0; i < datasettListe.length; i++) {
      var tema = datasettListe[i].tema;
      temaObjekt[tema].push(datasettListe[i]);
    }
}

function vis(x){
  var plakat = document.getElementById("visningen");
  plakat.innerHTML = null;
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

  function beskrivelse(x){
    her = document.getElementById('describe');
    for(var key in x){
      if(x.key != ""){
      }
    }

    her.innerHTML = "Episoden " + '"' + x.tittel + '"' + " finner sted i " + x.kommune;
  }

  function genderSplit(x){
    var q = 0;
    var m = 0;
    if(x.antall_kvinner != "" && !undefined && !null){
      var q = Number(x.antall_kvinner)
      console.log(q);
    }
    if(x.antall_menn != "" && !undefined && !null){
      var m = Number(x.antall_menn)
      console.log(m);
    }
      if(q == 0){
        console.log(q)
        document.getElementById("col1").style.width = 100+'%';
        document.getElementById("col1").innerHTML = 100+'%';
      } if (m == 0) {
        document.getElementById("col2").style.width = 100+'%';
        document.getElementById("col2").innerHTML = 100+'%';
      } else {
    document.getElementById("col1").style.width = (m/(m+q))*100+'%';
    document.getElementById("col1").innerHTML = Math.round((m/(m+q))*100)+'%';
    console.log("menn" + (m/(m+q))*100+'%')
    document.getElementById("col2").style.width = (q/(m+q))*100+'%';
    document.getElementById("col2").innerHTML = Math.round((q/(m+q))*100)+'%';
    console.log("kvinner" + (q/(m+q))*100+'%');

    }
  }

var kommuneObjekt = {}
  function kommuneBrowse(){
    clearText();
    var kommuneListe = [];
    var alfabetisk = [];
    datasettListe.forEach(function(element){
      if(!kommuneListe.includes(element.kommune)){
        kommuneListe.push(element.kommune);
      }
    })
    kommuneListe.sort();
    kommuneListe.forEach(function(element){
      if(!alfabetisk.includes(element.charAt(0))){
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
    node.onclick = function(){vis(kommuneObjekt[bokstav])};
    document.getElementById("herpes").appendChild(node);
  })
}

function visningsValg() {
  if(document.getElementById('alfa').checked){
    kommuneBrowse();
  }
  if(document.getElementById('beta').checked){
    temaSort();
  }
}
function clearText(){
  document.getElementById('describe').innerHTML = null;
  document.getElementById('visningen').innerHTML = null;
  document.getElementById("herpes").innerHTML = null;
  document.getElementById("col1").innerHTML = null;
  document.getElementById("col2").innerHTML = null;
}
