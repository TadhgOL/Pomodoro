let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeToggle = document.getElementById('mode-toggle');
const addFiveButton = document.getElementById('add-five');
const doubleTimeButton = document.getElementById('double-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// Initialize timer
timeLeft = WORK_TIME;
updateDisplay(timeLeft);

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.title = `(${minutes}:${seconds.toString().padStart(2, '0')}) Pomodoro Timer`;
}

function startTimer() {
    if (timerId !== null) return;
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            isWorkTime = !isWorkTime;
            timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
            updateDisplay(timeLeft);
            startButton.textContent = 'Start';
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
    document.title = 'Pomodoro Timer';
}

function addFiveMinutes() {
    if (timeLeft) {
        timeLeft += 5 * 60;
        updateDisplay(timeLeft);
    }
}

function doubleTime() {
    if (timeLeft) {
        timeLeft *= 2;
        updateDisplay(timeLeft);
    }
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);

modeToggle.addEventListener('change', () => {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    
    isWorkTime = !modeToggle.checked;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeLeft);
});

addFiveButton.addEventListener('click', (e) => {
    e.preventDefault();
    addFiveMinutes();
});

doubleTimeButton.addEventListener('click', (e) => {
    e.preventDefault();
    doubleTime();
}); 