let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeToggle = document.getElementById('mode-toggle');
const addFiveButton = document.getElementById('add-five');
const doubleTimeButton = document.getElementById('double-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `(${timeString}) Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    modeToggle.checked = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';

    const timerDisplay = document.querySelector('.timer');
    timerDisplay.classList.add('running');
}

function resetTimer() {
    // Stop the timer
    clearInterval(timerId);
    timerId = null;
    
    // Reset to work mode
    isWorkTime = true;
    modeToggle.checked = false;
    
    // Reset the time to initial work time
    timeLeft = WORK_TIME;
    
    // Update display
    const minutes = Math.floor(WORK_TIME / 60);
    const seconds = WORK_TIME % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Reset UI elements
    startButton.textContent = 'Start';
    modeText.textContent = 'Work Time';
    
    // Remove running class
    const timerDisplay = document.querySelector('.timer');
    timerDisplay.classList.remove('running');
    
    // Reset document title
    document.title = 'Pomodoro Timer';
}

function addFiveMinutes() {
    if (timeLeft) {
        timeLeft += 5 * 60;
        updateDisplay(timeLeft);
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
            startTimer();
        }
    }
}

function doubleTime() {
    if (timeLeft) {
        timeLeft *= 2;
        updateDisplay(timeLeft);
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
            startTimer();
        }
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
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
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

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft); 