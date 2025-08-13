// BODY STYLING - SPORTY BACKGROUND
document.body.style.margin = "0";
document.body.style.fontFamily = "'Segoe UI', sans-serif";
document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1470&q=80')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";

// CONTAINER
const container = document.createElement("div");
container.style.background = "rgba(255, 255, 255, 0.15)";
container.style.backdropFilter = "blur(10px)";
container.style.padding = "40px";
container.style.borderRadius = "16px";
container.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.gap = "25px";
document.body.appendChild(container);

// LABELS
const labelRow = document.createElement("div");
labelRow.style.display = "flex";
labelRow.style.gap = "25px";
container.appendChild(labelRow);

["Days", "Hours", "Minutes", "Seconds", "Milliseconds"].forEach(unit => {
  const label = document.createElement("div");
  label.textContent = unit;
  label.style.color = "#ffffff";
  label.style.fontWeight = "bold";
  label.style.fontSize = "16px";
  label.style.textAlign = "center";
  label.style.width = "75px";
  labelRow.appendChild(label);
});

// TIME DISPLAY
const timeRow = document.createElement("div");
timeRow.style.display = "flex";
timeRow.style.gap = "25px";
container.appendChild(timeRow);

const timeValues = {};
["days", "hours", "minutes", "seconds", "ms"].forEach(key => {
  const div = document.createElement("div");
  div.textContent = "00";
  div.style.fontSize = "40px";
  div.style.fontWeight = "bold";
  div.style.color = "#ffffff";
  div.style.width = "75px";
  div.style.textAlign = "center";
  div.style.textShadow = "2px 2px 6px rgba(0,0,0,0.6)";
  timeValues[key] = div;
  timeRow.appendChild(div);
});

// BUTTON CONTAINER
const buttonRow = document.createElement("div");
buttonRow.style.display = "flex";
buttonRow.style.gap = "15px";
container.appendChild(buttonRow);

// RESULT BOX (below buttons, fixed height, hidden by default)
const resultBox = document.createElement("div");
resultBox.style.marginTop = "20px";
resultBox.style.fontSize = "20px";
resultBox.style.color = "#00ffcc";
resultBox.style.fontWeight = "bold";
resultBox.style.textShadow = "1px 1px 4px #000";
resultBox.style.visibility = "hidden";       // instead of display: none
resultBox.style.minHeight = "24px";          // reserve space to prevent layout jump
resultBox.style.textAlign = "center";
container.appendChild(resultBox);

// BUTTON CREATOR
function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.style.fontSize = "18px";
  btn.style.padding = "10px 22px";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.background = "#ffffff";
  btn.style.color = "#111";
  btn.style.cursor = "pointer";
  btn.style.transition = "0.2s ease-in-out";
  btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
  btn.addEventListener("mouseenter", () => {
    btn.style.background = "#1e90ff";
    btn.style.color = "#fff";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.background = "#ffffff";
    btn.style.color = "#111";
  });
  btn.onclick = onClick;
  buttonRow.appendChild(btn);
  return btn;
}

// TIMER VARIABLES
let timer = null;
let startTime = null;
let elapsed = 0;
let isStarted = false;

// UPDATE DISPLAY
function updateDisplay() {
  let time = elapsed;
  const ms = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
  time = Math.floor(time / 1000);
  const secs = String(time % 60).padStart(2, '0');
  time = Math.floor(time / 60);
  const mins = String(time % 60).padStart(2, '0');
  time = Math.floor(time / 60);
  const hrs = String(time % 24).padStart(2, '0');
  const days = String(Math.floor(time / 24)).padStart(2, '0');

  timeValues.days.textContent = days;
  timeValues.hours.textContent = hrs;
  timeValues.minutes.textContent = mins;
  timeValues.seconds.textContent = secs;
  timeValues.ms.textContent = ms;

  return `${days}:${hrs}:${mins}:${secs}:${ms}`;
}

// START FROM 0
function startFromZero() {
  if (timer) clearInterval(timer);
  elapsed = 0;
  isStarted = true;
  startTime = Date.now();
  resultBox.style.visibility = "hidden"; // don't shift layout
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

// PAUSE
function pauseTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    resultBox.style.visibility = "visible";
    resultBox.textContent = `⏸️ Paused At: ${updateDisplay()}`;
  } else if (isStarted) {
    resultBox.textContent = `⏸️ Paused At: ${updateDisplay()}`;
  }
}

// RESUME
function resumeTimer() {
  if (!isStarted || timer) return;
  startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
  // Keep resultBox visible
}

// RESET
function resetTimer() {
  clearInterval(timer);
  timer = null;
  elapsed = 0;
  isStarted = false;
  updateDisplay();
  resultBox.style.visibility = "hidden"; // hide again
}

// BUTTONS
createButton("Start", startFromZero);
createButton("Pause", pauseTimer);
createButton("Resume", resumeTimer);
createButton("Reset", resetTimer);
