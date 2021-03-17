// Khai báo
let timeEle = document.querySelector('#time');
let scoreEle = document.querySelector('#score');
let wordEle = document.querySelector('#word');
let inputEle = document.querySelector('#text');
let finalScoreEle = document.querySelector('#final-score');
let levelOption = document.querySelectorAll('#level option')
let levelEle = document.querySelector('#level')
let word;
let interval;
let time = 99;
let words = [];


let startGame = document.querySelector('#start-game')
let game = document.querySelector('.container')
let endGame = document.querySelector('#end-game-container')
let startButton = document.querySelector('#btn-start-game')
let reloadButton = document.querySelector('#btn-reload-game')

// Bắt đầu chơi game & chơi lại
startButton.addEventListener('click', function () {
    play()
})

reloadButton.addEventListener('click', function () {
    start()
})


// Đếm ngược thời gian (tgian về 5s đổi màu)

function countDown() {
    time--;
    if (time > 9 || time == 0) {
        timeEle.innerText = `${time}s`
    }
    else {
        timeEle.innerText = `0${time}s`
    }
    if (time < 10) {
        timeEle.style.color = 'red';
    }
    if (time == 0) {
        timeEle.innerText = `${time}s`
        finalScoreEle.innerText = score;
        clearInterval(interval)
        end()
    }
}

// Cộng điểm
let score = 0
function updateScore() {
    score++;
    scoreEle.innerText = score;
}

// Tạo mảng từ và random từ
let words1 = [
    'clear',
    'all',
    'learn',
    'type',
    'study',
    'eat',
    'text',
    'keyboard',
    'speed',
    'test',
    'game',
    'javascript',
    'begin',
    'tree',
    'string',
    'function',
    'love',
    'look',
    'array',
    'event',
]

let words2 = [
    'document',
    'source',
    'calendar',
    'laptop',
    'light',
    'ground',
    'python',
    'programming',
    'initiate',
    'string',
    'function',
    'paragraph',
    'sentence',
    'javascript',
    'landslide',
    'eclipse',
    'darkness',
    'isolation',
    'upgrade',
    'clear',
    'learn',
    'type',
    'study',
    'text',
    'rock',
    'hungry',
    'young',
    'satisfy',
    'laugh',
    'smile',
]

let words3 = [
    'Massachusetts',
    'Mississippi',
    'initialize',
    'sophisticated',
    'assassinate',
    'isolation',
    'psychology',
    'liberation',
    'revelation',
    'ornithology',
    'scarcity',
    'discombobulate',
    'amethyst',
    'Renaissance',
    'lycanthrope',
    'meticulous',
    'scrumptious',
    'pizazz',
    'pizzas',
    'suburban',
    'assuming',
    'obstinance',
    'intelligence',
    'pronunciation',
    'handkerchief',
    'quarantine',
    'rearrange',
    'inexplicable',
    'irreplaceable',
    'seashore',
    'Schadenfreude',
]

function randomWord() {
    let index = Math.floor(Math.random() * words.length);
    return words[index]
}

function addWordToDom() {
    word = randomWord();
    // wordEle.innerText = word;
    wordEle.innerHTML = [...word].map(char => `<span>${char}</span>`).join('');
    wordEle.style.backgroundColor = 'transparent';
}

// Điền ô input kiểm tra từ
inputEle.addEventListener('input', function (e) {
    let value = e.target.value;
    let characters = document.querySelectorAll('#word span')

    if (time == 0) {
        return
    }

    // - Đúng: cộng điểm
    if (value == word) {
        updateScore();
        addWordToDom();
        e.target.value = '';
    }

    // Đổi background
    [...characters].map(ele => (ele.style.color = 'white'));
    wordEle.style.backgroundColor = 'transparent';

    if (!word.startsWith(value)) {
        wordEle.style.backgroundColor = 'rgb(216, 6, 6)';
        [...characters].map(ele => (ele.style.color = 'white'));
    }
    else {
        wordEle.style.backgroundColor = 'transparent';

        for (let i = 0; i < [...value].length; i++) {
            characters[i].style.color = ' rgb(46, 192, 46)';
        }
    }


})

function setDifficulty() {
    let difficulty = levelEle.value;
    switch (difficulty) {
        case 'easy':
            words = [...words1]
            time = 31
            break;
        case 'medium':
            words = [...words1]
            time = 21
            break;
        case 'hard':
            words = [...words2]
            time = 21
            break;
        case 'insane':
            words = [...words3]
            time = 16
            break;
        default:
            words = [...words1]
            time = 31
            break;
    }
}

levelEle.addEventListener('change', function () {
    console.log(levelEle.value)
    return levelEle.value
})


function start() {
    startGame.style.display = 'flex';
    game.style.display = 'none';
    endGame.style.display = 'none';
}

function play() {
    startGame.style.display = 'none';
    game.style.display = 'block';
    endGame.style.display = 'none';
    score = 0;
    timeEle.innerText = `${time}s`
    scoreEle.innerText = score;
    wordEle.innerText = '';

    wordEle.focus();
    setDifficulty()
    addWordToDom()
    interval = setInterval(countDown, 1000);

}

function end() {
    startGame.style.display = 'none';
    game.style.display = 'none';
    endGame.style.display = 'flex';
}

window.onload = start;