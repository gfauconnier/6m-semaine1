// rock-scissors-paper game :

// variables used to store scores
var scoreJ = 0;
var scoreO = 0;
// this function does everything needed for this game
function calcRes(n = 0) {
  var x = document.getElementById("choix").selectedIndex;
  var y = document.getElementById("choix").options;
  // gets the value of the selected <option> (0, 1 or 2)
  var joueur = y[x].value;

  // if n is 1 calculates the result of the match, if 0 then resets the scores
  if (n == 1) {
    // checks that both players have less than 2 points
    if (scoreJ < 3 && scoreO < 3) {
      var ordi = Math.trunc(Math.random() * 3);
      var res = ordi - joueur;
      // compares value of both players choice depending of the result players get points or a draw
      if (res == 1 || res == -2) {
        alert("Bien joué !");
        scoreJ++;
        if (scoreJ == 3) {
          alert("Vous avez gagné !");
          calcRes();
        }
      } else if (res == 2 || res == -1) {
        alert("booouh");
        scoreO++;
        if (scoreO == 3) {
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

var used = [];
var flag = 0;
var pendu = ["", "\n=========\n", "\n|\n|\n|\n|\n|\n=========\n", "\n+----+\n|\n|\n|\n|\n|\n=========\n", "\n+----+\n|    |\n|\n|\n|\n|\n=========\n", "\n+----+\n|    |\n|    O\n|\n|\n|\n=========\n", "\n+----+\n|    |\n|    O\n|    |\n|\n|\n=========\n", "\n+----+\n|    |\n|    O\n|   /|\n|\n|\n=========\n", "\n+----+\n|    |\n|    O\n|   /|\\\n|\n|\n=========\n", "\n+----+\n|    |\n|    O\n|   /|\\\n|   /\n|\n=========\n", "\n+----+\n|    |\n|    O\n|   /|\\\n|   / \\\n|\n=========\n"];

// hangman game :
function penduF() {
  var trys = 0,
    cpt = 0;
  var mots = ["pendu", "ciseaux", "pierre", "papier"];
  var toFind = mots[Math.trunc(Math.random() * mots.length)];
  var res = "";
  used = [];

  res = fillRes(toFind);


  while (trys < 10 && res != toFind) {
    // no verifications of what's prompted
    var char = prompt("Saisissez une lettre").toLowerCase();


    // only 1 alphabet character input
    if (char.length == 0 ||char.length > 1 || !char[0].match(/[a-z]/i)) {
      console.log("Veuillez ne saisir qu'une lettre !");
    } else {
      // checks the previous inputs if unique, pushes it in used
      res = checkUsed(char, res, toFind);
      cpt = 0;
    }

    if (flag == 0) {
      trys++;
    }
    console.log(pendu[trys]);
    console.log(res + " il vous reste " + (10 - trys) + " tentatives");
    console.log("vous avez déjà essayé : " + used);
    flag = 0;
  }

  winOrLose(res, trys, toFind);

}


/**
 * fillRes - fills the to be displayed solution with "_"
 *
 * @param  {string} strToFind the word to find
 * @return {string} res    return a string filled with str.length "_"
 */
function fillRes(strToFind){
  var res = "";
  for (var i = 0; i < strToFind.length; i++) {
    res += "_";
  }
  return res;
}


function checkUsed(char, res, toFind) {
  var cpt = 0;
  if (used.length > 0) {
    for (var i = 0; i < used.length; i++) {
      if (char == used[i]) {
        cpt++;
      }
    }
  }
  else {
    cpt = 100;
  }
  // compares the prompted char with the whole string
  if (cpt == 0 || cpt == 100) {
    res = compare(res, char, toFind);
  }
  else  {
    console.log("Vous avez déjà saisi ce caractère.");
  }

  return res;
}

function compare(res, char, toFind) {
  res = res.split("");
  for (var i = 0; i < toFind.length; i++) {
    if (char == toFind[i]) {
      // have to split and join res or else can't modify res[i]
      res[i] = toFind[i];
      flag = 1;
    }
  }
  res = res.join("");
  used.push(char);
  return res;
}

function winOrLose(res, trys, toFind) {
  if (res == toFind) {
    alert("Gagné ! Il vous restait : " + (10 - trys) + " essais");
  }
  else {
    alert("Perdu ! Il fallait trouver : " + toFind);
  }
}
