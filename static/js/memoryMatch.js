"use strict";


// const animals = ["tiger", "tiger", "elephant", "elephant", "peacock", "peacock", "turtle", "turtle"];
const animals = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];

// Gobal variables
const allCards = document.querySelector('.game-board');
let openCards = [];
let counter = 0;
let countStars = 0;
let remainingStars = 5;
let timer;
let points = 0;


// Winner announcement, shows points, congratts message, total time and remaining stars
const endGameAlertWinner = () => {

};

// Looser announcement, shows points, congratts message, total time and remaining stars
const endGameAlertLoser = () => {
	const loseMessage = `<h3 class="endgame-message">Sorry game over.</h3>`;

	const messageHeading = document.querySelector('.endgame-container');
	messageHeading.innerHTML = loseMessage;

};

/*-------------------------------------------------------------
  How long each player takes to match all of the matches
  -----------------------------------------------------------*/
const stopTimer = () => {
	clearInterval(timer);
};

const startTimer = () => {
	timer = setInterval(timerCount, 1000);
};

const timerCount = () => {
	counter += 1;
	$('.stop-watch').html(`${counter}`);
	console.log(counter);
};

/*-------------------------------------------------------------
  		Counts the points earned per match
  -----------------------------------------------------------*/

const countPoints = () => {
	points += 10;
	$('.point-count').html(points);
	if (points === 80) {
		stopTimer();
		console.log('points are 80');
		endGameAlertWinner();
		// add name and points the leader board
	}
};

/*-------------------------------------------------------------
 		After four missed matches, delete a star
  -----------------------------------------------------------*/
const starCounter = () => {

	countStars += 1;
	// console.log(`here are stars ${countStars}`);

	if (countStars === 1) {
		$('ul .star-holder:first-child').remove();
		countStars = 0;
		remainingStars -= 1;
			if (remainingStars === 0) {
		    	stopTimer();
		    	endGameAlertLoser();

			}
	}
};


/*-------------------------------------------------------------
 		Card logic: Checks if cards match or not
  -----------------------------------------------------------*/
const compareCards = () => {
	// Compares the cards using data-match attribute
	if (openCards[0].dataset.match === openCards[1].dataset.match) {
		// console.log(openCards.dataset.match);

		// Add 10 points for each correct match
		countPoints();

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


// Turn  two cards over
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


/*-------------------------------------------------------------
 		Builds the game board
  -----------------------------------------------------------*/
const buildGameBoard = () => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let animal of animals) {
		// console.log(animal);
		let buildBoxes = `<div class="card box" data-match=${animal[1]}>${animal[0]}<div>`;
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
$('button').on('click', () => {
	shuffle(animals);
	startTimer();
});
