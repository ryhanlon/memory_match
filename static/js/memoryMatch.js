"use strict";


// const animals = ["tiger", "tiger", "elephant", "elephant", "peacock", "peacock", "turtle", "turtle"];
const animals = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];


// match or not match

// Turn cards over

const addListener = () => {
	const allCards = document.querySelectorAll('.box');
	console.log(allCards[0]);

	allCards.forEach(function (card) {
		card.addEventListener('click', function (e) {
			card.classList.add('open', 'show');
		}, true)
	});

};

// Builds the game board

const buildGameBoard = () => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let animal of animals) {
		// console.log(animal);
		let buildBoxes = `<div class="card box ${animal[1]}">${animal[0]}<div>`;
		gameBoard.append(buildBoxes);

	}
	addListener();
};


// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (animals) => {
    let currentIndex = animals.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = animals[currentIndex];
        animals[currentIndex] = animals[randomIndex];
        animals[randomIndex] = temporaryValue;
    }

    return buildGameBoard(animals);
};


// Click button to start game
$('button').on('click', () => shuffle(animals));





// Choose two cards
// // const selectCard = () => {
// 	$('.box').on(click, () => {
// 		$(this).hide();
// 		    console.log("clicked me");
// 	});

// };

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
