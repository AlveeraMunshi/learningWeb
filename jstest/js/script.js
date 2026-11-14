// 99% — the script for the JavaScript Test exercise.
// Built out of the Module 10 tutorials: let and const variables, functions
// that take an input and return an output, document.querySelector to select
// elements, .innerHTML to change what they say, .style.cssText to set their
// styles, and one addEventListener for the click.

// --- variables ---

// The honest status lines, in the order the bar admits to them.
const statuses = [
    "fetching something it already has",
    "waiting on a font nobody will notice",
    "asking a server in Virginia how you are",
    "loading an image that is behind the fold",
    "counting the things it still has to count",
    "doing nothing, politely",
    "almost there, which is a thing loading bars say"
];

// The lines it repeats once it is stuck, so the page keeps answering after
// the bar has given up.
const stuckLines = [
    "still 99%",
    "still 99%, thanks for checking",
    "this is where loading bars live",
    "you can close the tab, it will not mind"
];

const ceiling = 99;   // the bar never reaches 100, that is the joke

let percent = 0;      // how full the bar is
let clicks = 0;       // how many times the button has been pressed

// The three parts of the page the script changes, plus the button it listens
// to. querySelector takes a CSS selector, so the ids are written with a #.
const fill = document.querySelector("#fill");
const percentText = document.querySelector("#percent");
const statusText = document.querySelector("#status");
const button = document.querySelector("#go");

// --- functions ---

// Input: how full the bar is now. Output: how far it moves on this click.
// Big jumps early and tiny ones near the top, which is how real loading bars
// lie about the time they have left.
function step(current) {
    const left = ceiling - current;
    return Math.max(1, Math.round(left * 0.35));
}

// Input: how full the bar is. Output: the colour it should be. Green while it
// is still pretending, red once it is stuck.
function colourFor(current) {
    if (current < ceiling) {
        return "var(--go)";
    }
    return "var(--stuck)";
}

// Input: the number of clicks so far. Output: the line to print under the bar.
function lineFor(count) {
    if (percent < ceiling) {
        return statuses[Math.min(count - 1, statuses.length - 1)];
    }
    return stuckLines[count % stuckLines.length];
}

// Input: the number of clicks so far. Output: what the button should say.
function labelFor(count) {
    if (percent < ceiling) {
        return "load";
    }
    return "load harder";
}

// Redraws the four things on the page that change. No input, no output; it
// just reads the variables above and writes them onto the page.
function draw() {
    fill.style.cssText = "width: " + percent + "%; background: " + colourFor(percent) + ";";
    percentText.innerHTML = percent + "%";
    statusText.innerHTML = lineFor(clicks);
    button.innerHTML = labelFor(clicks);
}

// --- the event listener ---

// One click moves the bar, counts the press, and redraws the page.
button.addEventListener("click", function() {
    clicks = clicks + 1;
    percent = Math.min(ceiling, percent + step(percent));
    draw();
});
