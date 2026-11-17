// Again Tomorrow — the script for the Transformation exercise.
// There are four skies and the page wears one of them at a time. A timer
// moves to the next one, conditionals decide what the sky is called, and
// when it runs off the end of the list it goes back to the start, which is
// the whole point of it.

// --- variables ---

const toggleButton = document.getElementById("toggle");
const skipButton = document.getElementById("skip");
const readout = document.getElementById("readout");
const starField = document.getElementById("stars");

const skies = ["sunrise", "midday", "sunset", "night"];
const HOLD = 4200;     // milliseconds each sky gets before the next one
const STAR_COUNT = 70;

let index = 0;
let timer = null;

// --- functions ---

// Scatter the stars. They sit in the sky the whole time at opacity 0, and
// only the night class makes them visible.
function makeStars() {
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 2.4 + 1;

        star.className = "star";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3.4 + "s";

        starField.appendChild(star);
    }
}

// What the sky is called, in words.
function nameOf(sky) {
    if (sky === "sunrise") {
        return "sunrise, the light coming back";
    }
    if (sky === "midday") {
        return "midday, nothing happening";
    }
    if (sky === "sunset") {
        return "sunset, everything orange for a minute";
    }
    return "night, and then it does it again";
}

// Put on the sky at the current index. Everything else is CSS.
function showSky() {
    document.body.className = skies[index];
    readout.textContent = nameOf(skies[index]);
}

// The next sky along. Past the end of the list it starts over, so the day
// never actually ends, it just comes back around.
function nextSky() {
    index = index + 1;

    if (index >= skies.length) {
        index = 0;
    }

    showSky();
}

function start() {
    if (timer !== null) {
        return;
    }
    timer = setInterval(nextSky, HOLD);
    toggleButton.textContent = "hold it here";
}

function stop() {
    clearInterval(timer);
    timer = null;
    toggleButton.textContent = "let it go around";
}

function toggle() {
    if (timer === null) {
        start();
    } else {
        stop();
    }
}

// Skip ahead by hand. If the sky is moving on its own, the clock is reset so
// the one you jumped to gets its full turn instead of a leftover second.
function skip() {
    nextSky();

    if (timer !== null) {
        clearInterval(timer);
        timer = setInterval(nextSky, HOLD);
    }
}

// --- event listeners ---

toggleButton.addEventListener("click", toggle);
skipButton.addEventListener("click", skip);

makeStars();
showSky();
