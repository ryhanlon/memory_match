"use strict";


// const animals = ["tiger", "tiger", "elephant", "elephant", "peacock", "peacock", "turtle", "turtle"];
const animals = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];

// Gobal variables
const allCards = document.querySelector('.game-board');
let openCards = [];
let counter = 0;
let countStars = 0;

// Winner anouncement
const winnerMessage = () => {

};

// After four missed matches, delete a star
const starCounter = () => {
	let remainingStars = 5;
	countStars += 1;
	console.log(`here are stars ${countStars}`);
	if (countStars === 2) {
		$('ul .star-holder:first-child').remove();
		countStars = 0;
		remainingStars -= 1;
			if (remainingStars === 0) {
		    	stopTimer();
			}
	}
};


// Time how long each player takes to match all of the matches
const timerCount = () => {
	counter += 1;
	$('.stop-watch').html(counter);
	console.log(counter);
};

const stopTimer = () => {
	clearInterval(startTimer);
};

const startTimer = () => {
	let incrementor = setInterval(timerCount, 1000);
};


// match or not match
const compareCards = () => {
	// Compares the cards using data-match attribute
	if (openCards[0].dataset.match === openCards[1].dataset.match) {
		// console.log(openCards.dataset.match);

		// Clears out the array for the next turn after a match
		openCards.splice(0, openCards.length);

		// Adds classes
		openCards[0].classList.add('match');
		openCards[0].classList.add('open');
		openCards[0].classList.add('show');

		openCards[1].classList.add('match');
		openCards[1].classList.add('open');
		openCards[1].classList.add('show');

	} else {
		starCounter();
		// console.log('sorry, no match');
		// If cards don't match, turns the cards back over and removes classes.
		setTimeout(function () {
			openCards.forEach(function (card) {
				card.classList.remove('open', 'show');
			});
			// Clears out the array for the next turn
			openCards.splice(0, openCards.length);
		}, 1000);

	}
};


// Turn cards over
const turnCardOver = (event) => {
	event.target.classList.add('open', 'show');
	openCards.push(event.target);

	if (openCards.length === 2) {
		compareCards();
	}
};


// Add event listener for click to turn over the cards
const addListener = () => {
	allCards.addEventListener('click', turnCardOver, true);
};


// Builds the game board
const buildGameBoard = () => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let animal of animals) {
		// console.log(animal);
		let buildBoxes = `<div class="card box" data-match=${animal[1]}>${animal[0]}<div>`;
		gameBoard.append(buildBoxes);

	}
	addListener();
	startTimer();
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
