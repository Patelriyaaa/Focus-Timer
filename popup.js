let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isPaused = false;
let focusMinutes = 25;
let shortBreak = 5;
let longBreak = 15;
const notificationSound = new Audio(chrome.runtime.getURL('notification.mp3'));

function updateTimerDisplay() {
  document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

function updateProgressBar() {
  const totalTime = focusMinutes * 60;
  const elapsedTime = (focusMinutes - minutes) * 60 + (60 - seconds);
  const progressPercentage = (elapsedTime / totalTime) * 100;
  document.getElementById('progress-bar').style.width = progressPercentage + '%';
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    document.getElementById('pause').textContent = 'Pause';
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          isRunning = false;
          notificationSound.play();
          alert('Time is up!');
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateTimerDisplay();
      updateProgressBar();
    }, 1000);
  }
}

document.getElementById('start').addEventListener('click', () => {
  if (!isRunning && !isPaused) {
    startTimer();
  } else if (isPaused) {
    // Resume the timer
    document.getElementById('pause').textContent = 'Pause';
    isPaused = false;
    startTimer(); // Continue the timer from where it was paused
  }
});

document.getElementById('pause').addEventListener('click', () => {
  if (isRunning) {
    if (isPaused) {
      // Timer is already paused; resume it
      startTimer();
    } else {
      // Pause the timer
      clearInterval(timer);
      isRunning = false;
      isPaused = true;
      document.getElementById('pause').textContent = 'Resume';
    }
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  minutes = parseInt(document.getElementById('focus-time').value) || 25;
  seconds = 0;
  updateTimerDisplay();
  document.getElementById('pause').textContent = 'Pause';
});
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const totalTime = focusMinutes * 60;
      const elapsedTime = (focusMinutes - minutes) * 60 + (60 - seconds);
      const progressPercentage = (elapsedTime / totalTime) * 100;
      progressBar.style.width = progressPercentage + '%';
    }
  }
  
  // Ensure you handle cases where elements might not be found
  document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
  
    if (startButton && pauseButton && resetButton) {
      startButton.addEventListener('click', () => {
        if (!isRunning && !isPaused) {
          startTimer();
        } else if (isPaused) {
          // Resume the timer
          document.getElementById('pause').textContent = 'Pause';
          isPaused = false;
          startTimer(); // Continue the timer from where it was paused
        }
      });
  
      pauseButton.addEventListener('click', () => {
        if (isRunning) {
          if (isPaused) {
            // Timer is already paused; resume it
            startTimer();
          } else {
            // Pause the timer
            clearInterval(timer);
            isRunning = false;
            isPaused = true;
            pauseButton.textContent = 'Resume';
          }
        }
      });
  
      resetButton.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
        minutes = parseInt(document.getElementById('focus-time').value) || 25;
        seconds = 0;
        updateTimerDisplay();
        document.getElementById('pause').textContent = 'Pause';
      });
    }
  });
  