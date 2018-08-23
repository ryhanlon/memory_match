'use strict'

//installed so Quokka works with jQuery
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;


/**
 * Data: Three arrays, three types of games
 */
const animals = [['tiger', 'match-one'], ['tiger', 'match-one'], ['elephant', 'match-two'], ['elephant', 'match-two'], ['peacock', 'match-three'], ['peacock', 'match-three'], ['turtle', 'match-four'], ['turtle', 'match-four'], ['swan', 'match-five'], ['swan', 'match-five'], ['wolf', 'match-six'], ['wolf', 'match-six'], ['dolphin', 'match-seven'], ['dolphin', 'match-seven'], ['alien', 'match-eight'], ['alien', 'match-eight']];

const wordPicture = [['diamond', 'match-one'], ['<i class="fa fa-diamond"></i>', 'match-one'], ['plane', 'match-two'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['anchor', 'match-three'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['bolt', 'match-four'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['cube', 'match-five'], ['<i class="fa fa-cube"></i>', 'match-five'], ['leaf', 'match-six'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['bicycle', 'match-seven'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['bomb', 'match-eight'], ['<i class="fa fa-bomb"></i>', 'match-eight']];

const picturePicture = [['<i class="fa fa-diamond"></i>', 'match-one'], ['<i class="fa fa-diamond"></i>', 'match-one'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['<i class="fa fa-cube"></i>', 'match-five'], ['<i class="fa fa-cube"></i>', 'match-five'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['<i class="fa fa-bomb"></i>', 'match-eight'], ['<i class="fa fa-bomb"></i>', 'match-eight']];


/**
 *  Global variables
 */
const allCards = document.querySelector('.game-board');
const menuButtonContainer = document.querySelector('.game-choice');
const openCards = [];
let seconds = 0;
let minutes = 0;
let combinedTime;
let countStars = 0;
let remainingStars = 5;
let timer = 0;
let points = 0;
let matches = 0;
let countMoves = 0;
let leaderBoardStorage = window.localStorage;
let bestTime = 15;


/**
 * Object: Audio bank for the three functions to trigger sounds
 */
const audioBank = {
	click_sfx: new Audio('static/audio/card_click.mp3'),
	win_sfx: new Audio('static/audio/game_win.mp3'),
	lose_sfx: new Audio('static/audio/game_lose.mp3')
};


/**
 * @description  Sound for button and card click
 */
const clickSound = () => audioBank.click_sfx.play();


/**
 * @description  Sound for winning message
 */
const winSound = () => audioBank.win_sfx.play();


/**
 * @description  Sound for losing message
 */
const loseSound = () => audioBank.lose_sfx.play();


/**
 * @description Shows the winner announcement
 */
const endGameAlertWinner = () => {
	// console.log('winner message is called');
	const winMessage = `Winner!  Winner!
					 In ${countMoves} moves you earned ${points} points.
					 Your time was ${minutes} minutes and ${seconds} seconds.
					 You still have ${remainingStars} stars.
					 Best Time is ${bestTime}`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = winMessage;
	winSound();
};


/**
 * @description Shows the loser announcement
 */
const endGameAlertLoser = () => {
	// console.log('loser message is called');
	const loseMessage = `Game over!  Game over!
					 Oh no! You have  ${remainingStars} stars!
					 In ${countMoves} moves you earned ${points} points.
					 Your time was ${minutes} minutes and ${seconds} seconds.
					 Best Time is ${bestTime}`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = loseMessage;
	loseSound();
};

/**
 * @description Removes both announcements
 */
const removeGameAlertLoser = () => {
	const message = document.querySelector('.message-container');
	message.classList.remove('show-message');
	message.classList.add('remove-message');
};


/**
 * @description Local storage for Leader Board
 */
const updateLeaderBoard = (seconds) => {
	let oldTime = localStorage.getItem("topPlayer");

	// Accesses current domain's localStorage object and add best player time to it
	if (oldTime === null) {
		leaderBoardStorage.setItem("topPlay", JSON.stringify(combinedTime));
		bestTime = combinedTime;
		console.log(`first leaderBoard value ${combinedTime}`);
	} else if (oldTime > seconds) {
		leaderBoardStorage.setItem("topPlayer", JSON.stringify(combinedTime));
		bestTime = combinedTime;
		console.log(`new time for leaderBoard ${combinedTime}`);
	} else {
		let remainingBestTime = JSON.parse(localStorage.getItem("topPlayer"));
		console.log(`localStorage stays with ${remainingBestTime}`);
	}
};


/**
 * Three functions that make the timer for the game
 */

/**
 * @description Stops the timer
 */
const stopTimer = () => clearInterval(timer);

/**
 * @description Starts the timer
 */
const startTimer = () => timer = setInterval(timerCount, 1000);

/**
 * @description Builds minutes and seconds
 */
const timerCount = () => {
	seconds += 1;
	// console.log(seconds);

	if (seconds < 10) {
		$('.stop-watch').html(`0${minutes}:0${seconds}`);
	} else if (seconds > 9) {
		$('.stop-watch').html(`0${minutes}:${seconds}`);

	}

	if (seconds === 60) {
		minutes += 1;
		// console.log('minutes: ' + minutes);
		seconds = 0;
			$('.stop-watch').html(`0${minutes}:${seconds}`);

	}
	combinedTime = `${minutes} minutes and ${seconds} seconds;`
};


/**
 * Three functions that adds and subtracts points for the game
 */

/**
 * @description Counts the points earned per each matched pair
 */
const addPoints = () => {
	points += 10;
	$('.point-count').html(points);
	return points;
};

/**
 * @description Counts points lost for each attempt to match cards
 */
const losePoints = () => {
	points -= 1;
	$('.point-count').html(points);
	return points;
};

/**
 * @description Counts each match, ends game a 8 matches
 */
const countMatches = () => {
	matches += 1;
	if (matches === 8) {
		stopTimer();
		updateLeaderBoard(seconds);
		console.log('all cards are matched');
		endGameAlertWinner();
	}
};


/**
 * @description Counts each pair of moves needed to match all card pairs
 */
const moveCounter = () => {
	countMoves += 1;
	$('.move-counter').html(countMoves);
	console.log('these are the moves baby: ' + countMoves);
	// return countMoves;
};


/**
 * @description Three functions for the management of stars
 */

/**
 * @description  Delete one star after 4 missed matches
 */
const starCounter = () => {

	countStars += 1;

	if (countStars === 4) {
		$('ul .star-holder:first-child').remove();
		countStars = 0;
		remainingStars -= 1;
			if (remainingStars === 1) {
		    	stopTimer();
		    	updateLeaderBoard(seconds);
		    	endGameAlertLoser();
			}
	}
};

/**
 * @description  Returns five stars when game resets
 */
const returnStars = () => {
	$('div.stars').append(`<ul class="stars-container">`);

	for (let i = 0; i <= 4; i++) {
		const stars = $(`<li class="star-holder"><i class="fa fa-star"></i></li>`);
		const starsContainer = $('.stars-container');
		starsContainer.append(stars);
	}
};

/**
 * @description  Clears remaining stars to set up for next game
 */
const clearRemainingStars = ()  => {
	if (remainingStars > 0) {
		 $('.stars-container').detach();
	}
};

/**
 * Functions for generating game board, shuffling cards, comparing cards
 */

/**
 * @description  Checks if cards match, if not turn back over
 */
const compareCards = () => {
	// Count how many times clicked pair until all matched
	moveCounter();

	// Compares the cards using data-match attribute
	if (openCards[0] === openCards[1]) {


		// Add 10 points for each correct match
		addPoints();

		// Count each match, at eight matches end game
		countMatches();

		// Adds classes, turns over cards
		$(`[data-match=${openCards[0]}]`).addClass('match');
		$(`[data-match=${openCards[0]}]`).removeClass('open');


		$(`[data-match=${openCards[1]}]`).addClass('match', 'show');
		$(`[data-match=${openCards[1]}]`).removeClass('open');

		// Clears out the array for the next turn after a match
		openCards.splice(0, openCards.length);
		// console.log('should be empty:' + openCards);


	} else {
		starCounter();

		// If cards don't match, turns the cards back over and removes classes.
		setTimeout(function () {
			$(`[data-match=${openCards[0]}]`).removeClass('open').removeClass('show');
			$(`[data-match=${openCards[1]}]`).removeClass('open').removeClass('show');
			$(`[data-match=${openCards[0]}]`).prop("disabled", false);
			$(`[data-match=${openCards[1]}]`).prop("disabled", false);

			// Lose point for miss
			losePoints();

			// Clears out the array for the next turn
			openCards.splice(0, openCards.length);

		}, 1000);
	}
};


/**
 * @description  Turns two cards over
 * @param {event} event - From clicked cards
 */
const turnCardOver = (event) => {
	// console.log(event);

	if (event.target.disabled !== "true") {
		clickSound();
		event.target.classList.add('open', 'show');
		openCards.push(event.target.dataset.match);
		$(event.target).prop("disabled", "true");

	}

	if (openCards.length === 2) {
		compareCards();
	}
};


/**
 * @description  eventListener to turn over each card
 */
const addListener = () => {
		allCards.addEventListener('click', turnCardOver);

};


/**
 * @description  Removes eventListener so click event doesn't happen until game starts
 */
const removeListener = () => {
	allCards.removeEventListener('click', turnCardOver);
};


/**
 * @description  Builds the game board
 */
const buildGameBoard = (gameChoice) => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let item of gameChoice) {
		// console.log(game);
		let buildBoxes = `<div class="card boxes" data-match=${item[1]}>${item[0]}
						 <div class="card-cover boxes" data-match=${item[1]}></div></div>`;
		gameBoard.append(buildBoxes);

	}
	returnStars();
	addListener();
};


/**
 * @description  Shuffle function from http://stackoverflow.com/a/2450976
 */

const shuffle = (gameChoice) => {
    let currentIndex = gameChoice.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = gameChoice[currentIndex];
        gameChoice[currentIndex] = gameChoice[randomIndex];
        gameChoice[randomIndex] = temporaryValue;
    }

    return buildGameBoard(gameChoice);
};


/**
 * @description  Resets the game, clears timer and points, resets stars, removes winner/loser message
 */
$(document).ready(function() {
	$('.reset-button').on('click', () => {
		stopTimer();

		openCards.splice(0, openCards.length);
		seconds = 0;
		minutes = 0;
		timer = 0;
		countStars = 0;
		remainingStars = 5;
		points = 0;
		matches = 0;
		countMoves = 0;

		// reset DOM for the control panel
		$('.stop-watch').html(seconds);
		$('.point-count').html(points);
		$('.move-counter').html(countMoves);
		$('.card').removeClass('open show');
		$('.stop-watch').html(`0${minutes}:0${seconds}`);


		// Call functions
		removeListener();
		clearRemainingStars();
		// returnStars();
		removeGameAlertLoser();
		$('.game-board').empty();
		clickSound();
		menuButtonContainer.classList.remove('hide-container');
	});
});


/**
 * Choose the type of game: three choices
 */

/**
 * @description  Chose which game: word to word
 */
$(function() {
	$('.word-word-button').on('click', () => {
		clickSound();
		shuffle(animals);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});

});

/**
 * @description  Chose which game: picture to word
 */
$(document).ready(function() {
	$('.pict-word-button').on('click', () => {
		clickSound();
		shuffle(wordPicture);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});
});

/**
 * @description  Chose which game: picture to picture
 */
$(function() {
	$('.pict-pict-button').on('click', () => {
		clickSound();
		shuffle(picturePicture);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});

});
