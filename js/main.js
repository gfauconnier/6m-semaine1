
// rock-scissors-paper game :

// variables used to store scores
var scoreJ = 0;
var scoreO = 0;
// this function does everything needed for this game
function calcRes(n=0) {
  var x = document.getElementById("choix").selectedIndex;
  var y = document.getElementById("choix").options;
  // gets the value of the selected <option> (0, 1 or 2)
  var joueur = y[x].value;

  // if n is 1 calculates the result of the match, if 0 then resets the scores
  if (n == 1) {
    // checks that both players have less than 2 points
    if (scoreJ < 2 && scoreO < 2) {
      var ordi = Math.trunc(Math.random() * 3);
      var res = ordi - joueur;
      // compares value of both players choice depending of the result players get points or a draw
      if (res == 1 || res == -2) {
        alert("Bien joué !");
        scoreJ++;
        if (scoreJ == 2) {
          alert("Vous avez gagné !");
          calcRes();
        }
      } else if (res == 2 || res == -1) {
        alert("booouh");
        scoreO++;
        if (scoreO == 2) {
          alert("Vous avez perdu !");
          calcRes();
        }
      } else {
        alert("Match nul !");
      }
      document.getElementById('resultat').innerHTML = " " + scoreJ + " - " + scoreO + " ";
    }
  }
  // resets the scores
  else {
    document.getElementById('resultat').innerHTML = " 0 - 0 ";
    scoreJ = 0;
    scoreO = 0;
  }
}


// hangedman game :
function pendu() {
  var trys = 0, flag = 0;
  var mots = ["pendu", "ciseaux", "pierre", "papier"];
  var toFind = mots[Math.trunc(Math.random() * mots.length)];
  var res  = "";

  for (var i = 0; i < toFind.length; i++) {
    res += "_";
  }

  while (trys < 10) {
    // no verifications of what's prompted
    var char = prompt("Saisissez une lettre").toLowerCase();

    // only 1 alphabet character input
    if (char.length > 1 || !char[0].match(/[a-z]/i)) {
      console.log("Veuillez ne saisir qu'une lettre !");
    }
    else {
      // compares the prompted char with the whole string
      for (var i = 0; i < toFind.length; i++) {
        if (char == toFind[i]) {
          // have to split and join res or else can't modify res[i]
          res = res.split("");
          res[i] = toFind[i];
          res = res.join("");
          flag = 1;
        }
      }
    }

    if (res == toFind) {
      trys = 20;
      break;
    }
    else if (flag == 0){
      trys++;
    }

    console.log(res + " il vous reste " + (10 - trys) + " tentatives");
    flag = 0;
  }

  if ((trys == 20) || (trys == 10 && res == toFind)) {
    alert("Gagné ! Il vous restait : " + (10 - trys) + " essais");
  }
  else {
    alert("Perdu ! Il fallait trouver : " + toFind);
  }

}
