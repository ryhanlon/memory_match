"use strict";


// const animals = ["tiger", "tiger", "elephant", "elephant", "peacock", "peacock", "turtle", "turtle"];
const animals = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];


// builds the game board

const buildGameBoard = () => {
	$('.game-board').empty();

	for (let animal of animals) {
		// console.log(animal);
		let buildBoxes = `<div class="box ${animal[1]}">${animal[0]}<div>`;
		$(".game-board").append(buildBoxes);
		// let mainContainer = document.querySelector('.main-container');
		// mainContainer.innerHTML = buildBoxes;
	}
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(animals) {
    let currentIndex = animals.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = animals[currentIndex];
        animals[currentIndex] = animals[randomIndex];
        animals[randomIndex] = temporaryValue;
    }

    return buildGameBoard(animals);
}

$('button').on('click', () => shuffle(animals));


// use .attr('class'); to get class name value of first pick to compare with the second pic


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
