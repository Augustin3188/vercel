// Khai báo
// Hiển thị quiz
let quizQuestion = document.querySelector('.quiz-question');
let quizAnswer = document.querySelector('.quiz-answer');
let progressBar = document.querySelector('.quiz-progress-bar');

// Hiển thị kết quả
let quizResult = document.querySelector('.quiz-results')
let quizBottom = document.querySelector('.quiz-bottom')
let quizProgress = document.querySelector('.quiz-progress')
let quizScore = document.querySelector('.quiz-results-score')

// Button
let nextButton = document.querySelector('.next-btn')
let previousButton = document.querySelector('.prev-btn')
let submitButton = document.querySelector('.finish-btn')
let reloadButton = document.querySelector('.back-btn')

// Lưu đáp án
let answers = []
let answersCorrect = ['2', '23', '10']
let score = 0
let currentQuestion = 0

// 1. Mock-up câu hỏi (mỗi câu là 1 object)
let questions = [
    {
        title: 'Đố biết 1 + 1 = ?',
        answer: '2',
        options: ['1', '2', '3', '4']
    },

    {
        title: '8 + 3 * 5 = ?',
        answer: '23',
        options: ['12', '34', '23', '45']
    },

    {
        title: '9 - 6 : 3 + 3 = ?',
        answer: '10',
        options: ['3', '10', '8', '0.5']
    },
]

// 2. Render giao diện câu hỏi

function showQuestion(index) {
    console.log(currentQuestion)
    // Render giao diện
    quizResult.style.display = 'none'
    submitButton.style.display = 'none'
    quizBottom.style.display = 'block'
    quizProgress.style.display = 'block'

    // Câu hỏi
    let question = questions[index];
    quizQuestion.innerHTML = `
    <p>Câu ${index + 1}: ${question.title}</p>
    `

    // Đáp án
    quizAnswer.innerHTML = ''
    for (let i = 0; i < question.options.length; i++) {
        quizAnswer.innerHTML += `
        <div class="quiz-item">
            <input type="radio" id="answer-${i + 1}" name="question-${index + 1}" ${answers[currentQuestion] == question.options[i] ? 'checked' : ''}>
                <label for="answer-${i + 1}">
                    <span></span>
                    <p>${question.options[i]}</p>
                </label>
        </div>
        `
    }

    // Cập nhật progress bar
    updateProgressBar()

    // Disable Button
    // disable previousButton ở câu hỏi đầu
    if (index == 0) {
        previousButton.classList.add('disable')
    }
    else {
        previousButton.classList.remove('disable')
    };

    // disable nextButton ở câu hỏi cuối
    if (index == questions.length - 1) {
        nextButton.classList.add('disable')
    }
    else {
        nextButton.classList.remove('disable')
    };

    // disable nextButton và submitButton nếu chưa chọn đáp án
    if (answers[currentQuestion]) {
        nextButton.classList.remove('disable');
        submitButton.classList.remove('disable');
    }
    else {
        nextButton.classList.add('disable');
        submitButton.classList.add('disable');
    }

    // Display nút submit
    if (currentQuestion == questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    }
    else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }


    // Chọn đáp án
    let input = document.querySelectorAll('.quiz-item input')
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('change', function () {
            let value = this.nextElementSibling.querySelector('p').innerText;
            answers[currentQuestion] = value;
            console.log(answers)
            nextButton.classList.remove('disable');
            submitButton.classList.remove('disable');
        })
    }
}

// Cập nhật độ dài progress bar
function updateProgressBar() {
    // Tính length => update
    let progressBarWidth = (currentQuestion + 1) / questions.length * 100
    progressBar.style.width = `${progressBarWidth}%`
}


// Next question
nextButton.addEventListener('click', function () {
    currentQuestion++;
    if (currentQuestion > questions.length - 1) {
        currentQuestion = questions.length - 1
        nextButton.classList.add('disable');
        submitButton.classList.remove('disable');
    }
    else {
        nextButton.classList.remove('disable');
        submitButton.classList.add('disable');
    }

    showQuestion(currentQuestion);
})

// Previous question
previousButton.addEventListener('click', function () {
    currentQuestion--;
    if (currentQuestion < 0) {
        currentQuestion = 0
    }

    showQuestion(currentQuestion);
})

// Submit button
submitButton.addEventListener('click', function () {
    // Hiển thị giao diện kết quả
    quizResult.style.display = 'block'
    quizBottom.style.display = 'none'
    quizProgress.style.display = 'none'

    // Kiểm tra đáp án đúng
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] == answersCorrect[i]) {
            score = score + 1
        }
    }

    // Hiển thị điểm
    quizScore.innerText = `Bạn đã trả lời ${score} câu đúng`
})

// Reload button
reloadButton.addEventListener('click', function () {
    window.location.reload()
})

window.onload = showQuestion(currentQuestion)
