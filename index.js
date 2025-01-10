let data = [
    {
        "image": "../asset/image1.png",
        "name": "kucing1"
    },
    {
        "image": "../asset/image2.png",
        "name": "kucing2"
    },
    {
        "image": "../asset/image3.png",
        "name": "kucing3"
    },
    {
        "image": "../asset/image4.png",
        "name": "kucing4"
    },
    {
        "image": "../asset/image5.png",
        "name": "kucing5"
    },
    {
        "image": "../asset/image6.png",
        "name": "kucing6"
    },
    {
        "image": "../asset/image7.png",
        "name": "kucing7"
    },
    {
        "image": "../asset/image8.png",
        "name": "kucing8"
    },
    {
        "image": "../asset/image9.png",
        "name": "kucing9"
    }
];

let dataAkun = [];


const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let live = 9;
let count = 0;

document.querySelector(".score").textContent = score;


cards = [...data, ...data];
shuffleCards();
generateCards();

document.getElementById("main-game").style.display = "none";


function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function createData() {
    let input = document.getElementById("name");
    let name = input.value;
    if (name.length === 0) {
        let alert = document.getElementById("alert");

        alert.innerText = "Please Insert Name!!!";

        return;
    }

    dataAkun.push(name.substring(0, 12));

    input.value = "";

    changeScreen(false);
    loadAkun();
}

function changeScreen(status) {
    let login = document.getElementById("login");
    login.style.display = (status === true) ? "block" : "none";

    let mainGame = document.getElementById("main-game");
    mainGame.style.display = (status === true) ? "none" : "block";

    restart();
}

function loadAkun() {
    let akun = document.getElementById("akun");
    akun.innerText = dataAkun[dataAkun.length - 1];
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    // console.log(firstCard.dataset.name, "===", secondCard.dataset.name);

    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch === true) {
        score += 100 / data.length;
        document.querySelector(".score").textContent = score.toFixed();
    }
    
    
    lockBoard = true;
    
    checkForMatch();
    checkScore();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        count++;
        
        if (count === live) {
            alert("Unlucky you lose, please try again");
            
            count = 0;
            
            let login = document.getElementById("login");
            login.style.display = "block";
            
            changeScreen(true);
            return;
        }
        
        resetBoard();
    }, 1000);
}

function checkScore() {
    setTimeout(() => {
        if (Math.floor(score) === 100) {
            alert("Congrats! You Win!");
            changeScreen(true);
        }
    }, 500);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.getElementById("name").value = "";
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}