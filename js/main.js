// rock-scissors-paper game :

// variables used to store scores
var scoreJ = 0;
var scoreO = 0;
var playerChoice = 0;
var playerName = prompt("Saisissez votre nom : ").toUpperCase();
var compName = "";

/**
 * playerN - just prompts the user to input his/her name and displays it
 *
 * @return {type}  no return only display
 */
function playerN() {
  if (window.innerWidth >= 768) {
    compName = "ORDI"
    if (!playerName) {
      playerName = "JOUEUR";
    }
  } else {
    playerName = "J";
    compName = "PC";
  }
  affScore();
}


/**
 * calcRes - main function for rock-scissors-paper structure of all called functions
 *
 * @param  {type} n = 0 sent to change what'll the function displays or calculate
 * @return {type}       no return only display
 */
function calcRes(n = 0) {

  // if n is 1 calculates the result of the match, if 0 then resets the scores
  altBtn();
  if (n == 1) {
    // checks that both players have less than 3 points
    if (scoreJ < 3 && scoreO < 3) {

      var ordi = Math.trunc(Math.random() * 3);
      document.getElementById("img_o").src = "img/rsp" + ordi + ".svg";

      // compares value of both players choice depending of the result players get points or a draw
      var res = ordi - playerChoice;
      displayResult(res);
      altBtn(2);
    }
    // displays Continue button and changes player choice back to default img
  } else if (n == 2) {
    document.getElementById("img_p").src = "img/qmark.svg";
    document.getElementById("btn_continue").classList.add("d-none");
    displayFight();
  }
  // resets the scores
  else {
    altBtn(3);
    displayFight();
    scoreJ = 0;
    scoreO = 0;
  }
}


/**
 * displayResult - this function gets the result of (ordi - playerChoice) from calcRes() and depending
 *  on what's sent displays the result
 *
 * @param  {integer} res result of (computer choice - player choice) sent and used to display result
 * @return {type}     no return only display
 */
function displayResult(res) {
  if (res == 1 || res == -2) {
    document.getElementById("aff_res").innerHTML = "Bien joué !";
    document.getElementById("img_p").style.zIndex = "1";
    window.innerWidth > 768 ? fight(40) : fight(28);
    scoreJ++;
    if (scoreJ == 3) {
      document.getElementById("aff_res").innerHTML = "Vous avez gagné ! (" + scoreJ + " - " + scoreO + ")";
      altBtn(1);
    }
  } else if (res == 2 || res == -1) {
    document.getElementById("aff_res").innerHTML = "Dommage !";
    document.getElementById("img_o").style.zIndex = "1";
    window.innerWidth > 768 ? fight(40) : fight(28);
    scoreO++;
    if (scoreO == 3) {
      document.getElementById("aff_res").innerHTML = "Vous avez perdu ! (" + scoreJ + " - " + scoreO + ")";
      altBtn(1);
    }
  } else {
    window.innerWidth > 768 ? fight() : fight(16);
    document.getElementById("aff_res").innerHTML = "Match nul !";
  }
  affScore();
}


/**
 * displayPlayerChoice - this function changes the img src of player choice
 *
 * @param  {integer} choice 0, 1 or 2 depending of choice button selected
 * @return {type}        no return only display
 */
function displayPlayerChoice(choice) {
  document.getElementById("img_p").src = "img/rsp" + choice + ".svg";
  document.getElementById("btn_jouer").classList.remove("d-none");
  playerChoice = choice;
}


/**
 * imgRotation - This functions changes img src of computer placeholder choice every 800ms
 *
 * @return {type}  nothing returned only display changes
 */
function imgRotation() {
  var tab = [0, 1, 2];
  var n;
  setInterval(function() {
    n = tab.shift();
    tab.push(n);
    document.getElementById("img_r").src = "img/rsp" + tab[0] + ".svg";
  }, 800);

}


/**
 * altBtn - A function to display/hide elements of html depending of what is sent
 *
 * @param  {integer} n = 0 an integer sent as param to check what to display (0 by default)
 * @return {type}       nothing returned
 */
function altBtn(n = 0) {
  if (n == 0) {
    document.getElementById("img_o").classList.toggle("d-none");
    document.getElementById("img_r").classList.toggle("d-none");
    document.getElementById("aff_res").classList.toggle("d-none");
    var btnCh = document.getElementsByClassName("btn_choice");
    for (var i = 0; i < btnCh.length; i++) {
      btnCh[i].classList.toggle("d-none");
    }
  } else if (n == 1) {
    document.getElementById("btn_continue").classList.toggle("d-none");
    document.getElementById("btn_rejouer").classList.toggle("d-none");
  } else if (n == 2) {
    document.getElementById("btn_jouer").classList.add("d-none");
    document.getElementById("btn_continue").classList.toggle("d-none");
  } else {
    document.getElementById("resultat").innerHTML = playerName + " 0 - 0 ";
    document.getElementById("img_p").src = "img/qmark.svg";
    document.getElementById("btn_jouer").classList.add("d-none");
    document.getElementById("btn_rejouer").classList.toggle("d-none");
  }
}


/**
 * displayFight - reset position and z-index of fighting divs
 *
 * @return {type}  no return only display
 */
function displayFight() {
  document.getElementById("img_p").style.zIndex = 0;
  document.getElementById("img_o").style.zIndex = 0;
  if (window.innerWidth >= 768) {
    document.getElementById("img_p").style.left = "10vw";
    document.getElementById("img_p").style.top = 0;
    document.getElementById("img_o").style.right = "10vw";
    document.getElementById("img_o").style.bottom = 0;
  } else {
    document.getElementById("img_p").style.left = 0;
    document.getElementById("img_p").style.top = "10vh";
    document.getElementById("img_o").style.right = 0;
    document.getElementById("img_o").style.bottom = "10vh";
  }
}


/**
 * fight - creates an interval to make 2 divs move towards each other
 *
 * @param  {integer} max = 30 how much to move div towards each other (30 by default)
 * @return {type}           no return only display
 */
function fight(max = 30) {
  var moveDiv = 0;
  var timer = setInterval(function() {
    moveDiv += 2;
    if (window.innerWidth > 768) {
      document.getElementById("img_p").style.left = moveDiv + "vw";
      document.getElementById("img_o").style.right = moveDiv + "vw";
    } else {
      document.getElementById("img_p").style.top = moveDiv + "vh";
      document.getElementById("img_o").style.bottom = moveDiv + "vh";
    }
    // clear the timer at max to stop the animation
    if (moveDiv == max) {
      clearInterval(timer);
    }
  }, 16);
}


function affScore() {
  document.getElementById("resultat").innerHTML = playerName + " " + scoreJ + " - " + scoreO + " " + compName;
}


// ############################################################################################
// ############################################################################################
// ############################################################################################
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
    if (char.length == 0 || char.length > 1 || !char[0].match(/[a-z]/i)) {
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
function fillRes(strToFind) {
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
  } else {
    cpt = 100;
  }
  // compares the prompted char with the whole string
  if (cpt == 0 || cpt == 100) {
    res = compare(res, char, toFind);
  } else {
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
  } else {
    alert("Perdu ! Il fallait trouver : " + toFind);
  }
}
