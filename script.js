const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 50;
 playerLivesCount.textContent = playerLives;
let scoreIcon = document.querySelector('.scoreIcon');
let scoreCount = 0;
let score = document.querySelector(".score");
const youWin = document.querySelector('svg');
const gameWrapper = document.querySelector('.gameWrapper');
const btn = document.querySelector('.btn');
const characterImage = document.querySelector('.characterImage')

// generate the data
const getData = () => [
{name: "Wolverine", imageSrc: "img/characters/Wolverine.png"},
{name: "Colossus", imageSrc: "img/characters/Colossus.png"},
{name: "Cyclops", imageSrc: "img/characters/Cyclops.png"},
{name: "Gambit", imageSrc: "img/characters/Gambit.png"},
{name: "Juggernaut", imageSrc: "img/characters/Juggernaut.png"},
{name: "Magneto", imageSrc: "img/characters/Magneto.png"},
{name: "Rogue", imageSrc: "img/characters/Rogue.png"},
{name: "Sabretooth", imageSrc: "img/characters/Sabretooth.png"},
{name: "Wolverine", imageSrc: "img/characters/Wolverine.png"},
{name: "Colossus", imageSrc: "img/characters/Colossus.png"},
{name: "Cyclops", imageSrc: "img/characters/Cyclops.png"},
{name: "Gambit", imageSrc: "img/characters/Gambit.png"},
{name: "Juggernaut", imageSrc: "img/characters/Juggernaut.png"},
{name: "Magneto", imageSrc: "img/characters/Magneto.png"},
{name: "Rogue", imageSrc: "img/characters/Rogue.png"},
{name: "Sabretooth", imageSrc: "img/characters/Sabretooth.png"},
];

// randomize
const randomize =  () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5)
    return cardData;
}

// card generator func
const cardGenerator = () =>{
    const cardData = randomize();
// generate HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
// attach info to the cards
        face.src = item.imageSrc;
        card.setAttribute('name', item.name);
// attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click' ,(e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    })  
}


// check cards
const checkCards = (e) => {
    console.log(e)
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    clickSound();
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard')
    console.log(flippedCards)
// logic
    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('Match!')
            console.log(flippedCards[0].getAttribute('name'))
            let showChar = flippedCards[0].getAttribute('name');
            console.log(showChar)
            scoreCount += 1;
            playSound();
            score.classList.remove('hide');
            score.src = `
            img/numbers/${scoreCount}.png
            `;
            characterImage.src = `
            img/characters/${showChar}.png
            `;
            characterImage.style.animation = "showCharacter 2s 1";
            setTimeout(() => {
                characterImage.style.animation = "none";
              }, "2000");
            
            // characterImage.style.display = 'block';
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        }
        else {
            console.log('Wrong!')
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() =>card.classList.remove('toggleCard'), 1000)
                playerLives -=.5;
                playerLivesCount.textContent = playerLives;
                if(playerLives  === 0) {
                    gameOver();
                    restart();
                }
            })
        }
    }

    // run a check to see if we won a game
    if(toggleCard.length === 16) {
        youWin.classList.remove('hide');
        gameWrapper.classList.add('hide');
        document.body.style.background = "black";
        youWinSound();
        yourScore();
    }
}

// restart game
// const restart = () => {
//     document.location.reload();
//     let cardData = randomize();
//     let faces = document.querySelectorAll('.face');
//     let cards = document.querySelectorAll('.card');
//     section.style.pointerEvents = 'none'
//     cardData.forEach((item,index) => {
//         cards[index].classList.remove('toggleCard')
//         // randomize
//         setTimeout(() => {
//             cards[index].style.pointerEvents = 'all';
//             faces[index].src = item.imageSrc;
//             cards[index].setAttribute('name', item.name)
//             section.style.pointerEvents = 'all'
//         }, 1000)
    
//     })
//     playerLives = 50;
//     score.classList.add('hide');
//     playerLivesCount.textContent = playerLives;
//     yourScore.classList.add('hide');
//     gameWrapper.classList.remove('hide');
//     document.body.style.background = "none";
// }

const restart = () => {
    document.location.reload();
}

// total score func
function yourScore() {
    const totalScore = playerLives * 100;
    let counts = setInterval(updated);
let upto = 0;
function updated() {
    let yourScore = document.querySelector('.yourScore');
    yourScore.style.display = 'block';
    yourScore.classList.remove('hide');
    yourScore.innerHTML = `Your score is: ${++upto}`;
    if (upto === totalScore) {
        clearInterval(counts);
    }
}
}

// click sound func
let clickSound = () => new Audio("sounds/click.wav").play();
// score sound func
let playSound = () => new Audio("sounds/score.wav").play();

// you win sound func
let youWinSound = () => new Audio("sounds/x_men_theme.mp3").play();

// restart sound func
let restartGame = () => new Audio("sounds/restart.wav").play();

// game over sound func
let gameOver = () => new Audio("sounds/gameOver.wav").play();



cardGenerator()