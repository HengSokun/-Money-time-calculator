let isStarted = true,
  isStopped = false,
  isCleared = false,
  startTime,
  stopTime;

// Get the current time
function getCurrentTime() {
  try {
    const time = new Date();
    const date = time.toDateString() + " " + time.toLocaleTimeString();
    document.getElementById("localtime").textContent = date;
  } catch (e) {
    document.getElementById("localtime").textContent =
      "Error: unsupported localtime or os";
  }
}

// Calculate the time
function timeCalculate(startTime, stopTime) {
  const timeDiff = stopTime - startTime;
  const timeInMinutes = timeDiff / 60000;
  console.log(timeInMinutes);

  let amount = 0;

  const calculateAmount = (minutes) => {
    if (minutes <= 15) {
      return 500;
    } else if (minutes >= 16 && minutes <= 30) {
      return 1000;
    } else if (minutes >=  31 && minutes <= 60) {
      return 1500;
    } else {
      const extraMinutes = minutes - 60;
      return 1500 + calculateAmount(extraMinutes);
    }
  };

  amount = calculateAmount(timeInMinutes);
  document.getElementById("minute_time").textContent =
    Math.trunc(timeInMinutes);
  document.getElementById("amount_time").textContent = amount;
}

// Button for click
function button() {
  const startButton = document.getElementById("start");

  if (isStarted) {
    startButton.style.backgroundColor = "red";
    startButton.textContent = "Stop";
    isStarted = false;
    startTime = new Date().getTime();
    document.getElementById("from_time").textContent =
      new Date().toLocaleTimeString();
    isStopped = true;
  } else if (isStopped) {
    startButton.style.backgroundColor = "green";
    startButton.textContent = "Clear";
    isStopped = false;
    stopTime = new Date().getTime();
    document.getElementById("end_time").textContent =
      new Date().toLocaleTimeString();
    timeCalculate(startTime, stopTime);
    isCleared = true;
  } else {
    startButton.style.backgroundColor = "rgb(234, 179, 8)";
    startButton.textContent = "Start";
    isCleared = false;
    document.getElementById("from_time").textContent = "0:00";
    document.getElementById("end_time").textContent = "0:00";
    document.getElementById("minute_time").textContent = "0";
    document.getElementById("amount_time").textContent = "0";
    isStarted = true;
  }
}

const resetTime = setInterval(getCurrentTime, 1000);
