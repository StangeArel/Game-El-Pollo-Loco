/** @type {number[]} Stores all active interval IDs */
let intervalIds = [];

/**
 * Creates a setInterval that can be stopped later using stopAllIntervals.
 *
 * @param {Function} fn - The function to be executed repeatedly.
 * @param {number} time - The interval time in milliseconds.
 * @returns {number} The ID of the created interval.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

/**
 * Stops all intervals that were created using setStoppableInterval.
 */
function stopAllIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = []; // Optional: Clear the list after stopping
}
