let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

function stopAllIntervals() {
    intervalIds.forEach(clearInterval);
}