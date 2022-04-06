const button = document.getElementById('btn');
button.addEventListener('click', getData);
const resultDiv = document.getElementById('result');
const numeroBombe = 16;
const bombe = [];
let tentativiMax;
let tentativi = 0;

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

function generateBomb(numerobox) {
  tentativiMax = numerobox - numeroBombe;
  console.log('tentativiMax: ', tentativiMax)
  bombe.length = 0;
  while (bombe.length < numeroBombe) {
    let arrayBomba = random(1, numerobox);
    if (!bombe.includes(arrayBomba)) {
      bombe.push(arrayBomba);
    }
  }
  
  console.log(bombe)
  return tentativiMax;
}

function colorBox(tentativiMax) {
    let num = parseInt(this.innerText);
    tentativi++
    if (bombe.includes(num)) {
      mostraBoxNascosti();
      this.style.backgroundColor = "red";
      this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
      partitaconclusa();
    } else {
      this.style.backgroundColor = "#6495ed";
      if (tentativi === tentativiMax) {
        resultDiv.innerHTML += `
            <h1>Hai vinto!</h1>
            <h3>${tentativi}</h3>`;
            showBox();
      }
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", colorBox);
}

function partitaconclusa() {
  allBox = document.querySelectorAll('.box')
  for (i = 0; i < allBox.length; i++){
    allBox[i].classList.remove('pointer')
    allBox[i].removeEventListener('click', colorBox);
}
  resultDiv.innerHTML = `
  <h1>Hai perso!</h1>
  <h3>Tentativi: ${tentativi}</h3>
  `
}

function mostraBoxNascosti(){
  allBox = document.querySelectorAll('.box')
  for (i = 0; i < allBox.length; i++){
      let num = parseInt(allBox[i].innerText)
      if(bombe.includes(num)){
          allBox[i].style.background = 'red';
          allBox[i].innerHTML = `<i class="fa-solid fa-bomb"></i>`;
      }
  }
}