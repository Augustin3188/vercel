// Khai báo
// Player 1
let p1 = document.querySelector('.player-0-panel');
let p1Name = document.querySelector('#name-0');
let p1Score = document.querySelector('#score-0');
let p1CurrentScore = document.querySelector('#current-0');

// Player 2
let p2 = document.querySelector('.player-1-panel');
let p2Name = document.querySelector('#name-1');
let p2Score = document.querySelector('#score-1');
let p2CurrentScore = document.querySelector('#current-1');

// Xúc xắc
let dice1 = document.querySelector('#dice-1');
let dice2 = document.querySelector('#dice-2');

// Button
let newGameButton = document.querySelector('.btn-new');
let rollButton = document.querySelector('.btn-roll');
let saveButton = document.querySelector('.btn-hold');

// Input 
let finalScore = document.querySelector('.final-score')

let score = 0;
let currentScore = 0;
let activePlayer = 0;

// Âm thanh
let startSound
let saveSound
let winSound
let changeSound
// let backgroundMusic
let rollSound

// ===========================================================================

// 6. Âm thanh
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
    console.log(this)
}

// 1. Tạo thuộc tính ban đầu cho game
function init() {
    // Đổi tên
    p1Name.innerText = 'Player 1';
    p2Name.innerText = 'Player 2';

    // Reset điểm
    p1Score.innerText = score;
    p1CurrentScore.innerText = currentScore;
    p2Score.innerText = score;
    p2CurrentScore.innerText = currentScore;

    // Ẩn ảnh xúc xắc
    dice1.classList.add('hide');
    dice2.classList.add('hide');

    // Xác định người chơi trước
    p1.classList.add('active');

    // Xóa trạng thái thắng
    p1.classList.remove('winner');
    p2.classList.remove('winner');

    // Reset nút
    rollButton.addEventListener('click', rollDice);
    saveButton.addEventListener('click', saveScore);

    // Âm thanh
    startSound = new sound("./audio/start.mp3");
    startSound.play();


    // Background music
    // backgroundMusic = new sound("./audio/bg.mp3");
    // backgroundMusic.sound.volume = 0.25;
    // backgroundMusic.sound.loop = true;
    // backgroundMusic.play();
}

// ===========================================================================
// 2. Xử lý sự kiện lắc xúc xắc + 3. Xử lý khi đổi người chơi

// Đổi người chơi
function changePlayer() {
    // Đổi người chơi khi roll ra 1
    p1.classList.toggle('active');
    p2.classList.toggle('active');

    //  Ẩn xúc xắc
    setTimeout(function () {
        dice1.classList.add('hide');
        dice2.classList.add('hide');
    }, 700);

    // Xóa điểm chưa được lưu
    document.getElementById(`current-${activePlayer}`).innerHTML = 0

    // Đổi active player (để xác định vị trí cộng điểm)
    if (p1.classList.contains('active')) {
        activePlayer = 0;
    }
    else {
        activePlayer = 1;
    }
}

function rollDice() {
    let num1 = Math.floor(Math.random() * 6) + 1
    let num2 = Math.floor(Math.random() * 6) + 1

    // Hiển thị ảnh xúc xắc
    dice1.src = `./img/dice-${num1}.png`
    dice2.src = `./img/dice-${num2}.png`
    dice1.classList.remove('hide');
    dice2.classList.remove('hide');

    // Xử lý giá trị xúc xắc
    if (num1 == 1 || num2 == 1) {
        changePlayer()
        changeSound = new sound("./audio/change.mp3");
        setTimeout(function () {
            changeSound.play();
        }, 250);
    }

    // Cộng điểm khi không roll ra 1
    else if (num1 != 1 && num2 != 1) {
        document.getElementById(`current-${activePlayer}`).innerHTML = document.getElementById(`current-${activePlayer}`).innerHTML * 1 + num1 + num2
    }

    // Nếu ô input trống
    if (finalScore.value == '') {
        finalScore.value = 100
    }

    rollSound = new sound("./audio/roll.mp3")
    rollSound.play()
}

rollButton.addEventListener('click', rollDice)

// ===========================================================================
// 5. Lưu trữ điểm và kiểm tra người thắng cuộc
function saveScore() {
    // Nếu ô input trống
    if (finalScore.value == '') {
        finalScore.value = 100
    }

    // Lưu điểm
    document.getElementById(`score-${activePlayer}`).innerHTML = document.getElementById(`score-${activePlayer}`).innerHTML * 1 + document.getElementById(`current-${activePlayer}`).innerHTML * 1;

    // Âm thanh
    saveSound = new sound("./audio/save.mp3");
    saveSound.play();

    // Kiểm tra người thắng
    // Đổi người chơi nếu chưa đủ điều kiện thắng
    if (document.getElementById(`score-${activePlayer}`).innerHTML * 1 < finalScore.value) {
        changePlayer();
    }

    // Thông báo người thắng
    else if (document.getElementById(`score-${activePlayer}`).innerHTML * 1 >= finalScore.value) {
        // Ẩn xúc xắc
        dice1.classList.add('hide');
        dice2.classList.add('hide');

        // Thông báo người thắng
        document.getElementById(`name-${activePlayer}`).innerText = 'WINNER';
        document.getElementById(`player-${activePlayer}`).classList.add('winner');

        // disable button
        rollButton.removeEventListener('click', rollDice);
        saveButton.removeEventListener('click', saveScore);

        // Âm thanh
        // backgroundMusic.pause()
        winSound = new sound("./audio/win.mp3")
        winSound.play()
    }
}

saveButton.addEventListener('click', saveScore)


// New game
newGameButton.addEventListener('click', init)
window.onload = init