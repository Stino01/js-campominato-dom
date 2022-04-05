const button = document.getElementById('btn');
button.addEventListener('click', getData);
const numeroBombe = 16;
const bombe = [];

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

function getData() {
    let inputVal = document.getElementById('difficulty').value;
    console.log(inputVal)
    let numerobox = 0;

    if (inputVal === 'easy') {
        numerobox = 100;
    } else if (inputVal === 'hard') {
        numerobox = 81;
    } else {
        numerobox = 49;
    }
    console.log(numerobox)
    let latoSquare = Math.sqrt(numerobox);
    console.log("celle per lato: ", latoSquare);
    generateBomb(numerobox);
    stampaGriglia(numerobox, latoSquare);
}

function generateBomb(numerobox) {
    while (bombe.length < numeroBombe) {
      let arrayBomba = random(1, numerobox);
      if (!bombe.includes(arrayBomba)) {
        bombe.push(arrayBomba);
      }
    }
    console.log(bombe)
  }

function stampaGriglia(numerobox, latoSquare) {
    let contenitore = document.getElementById('main-cont');
    contenitore.innerHTML ='';
    let row = document.createElement("div");
    row.setAttribute("class", "app");
    for (let i = 1; i <= numerobox; i++) {
        const box = generaCella(i, latoSquare);
        row.append(box);
      }
    contenitore.append(row);
}

function generaCella(numerobox, latoSquare) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    box.style.width = `calc(100% / ${latoSquare})`;
    box.style.height = `calc(100% / ${latoSquare})`;
    box.classList.add("pointer");
    box.innerHTML = `<span>${numerobox}</span>`;
    box.addEventListener("click", colorBox);
    return box;
}

function colorBox() {
    let num = parseInt(this.innerText);
    if (bombe.includes(num)) {
      this.style.backgroundColor = "red";
      this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
    } else {
      this.style.backgroundColor = "#6495ed";
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", colorBox);
}

/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */