'use strict'

//installed so Quokka works with jQuery
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;

const animals = [['tiger', 'match-one'], ['tiger', 'match-one'], ['elephant', 'match-two'], ['elephant', 'match-two'], ['peacock', 'match-three'], ['peacock', 'match-three'], ['turtle', 'match-four'], ['turtle', 'match-four'], ['swan', 'match-five'], ['swan', 'match-five'], ['wolf', 'match-six'], ['wolf', 'match-six'], ['dolphin', 'match-seven'], ['dolphin', 'match-seven'], ['alien', 'match-eight'], ['alien', 'match-eight']];

const wordPicture = [['diamond', 'match-one'], ['<i class="fa fa-diamond"></i>', 'match-one'], ['plane', 'match-two'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['anchor', 'match-three'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['bolt', 'match-four'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['cube', 'match-five'], ['<i class="fa fa-cube"></i>', 'match-five'], ['leaf', 'match-six'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['bicycle', 'match-seven'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['bomb', 'match-eight'], ['<i class="fa fa-bomb"></i>', 'match-eight']];

const picturePicture = [['<i class="fa fa-diamond"></i>', 'match-one'], ['<i class="fa fa-diamond"></i>', 'match-one'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['<i class="fa fa-paper-plane-o"></i>', 'match-two'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['<i class="fa fa-anchor"></i>', 'match-three'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['<i class="fa fa-bolt"></i>', 'match-four'], ['<i class="fa fa-cube"></i>', 'match-five'], ['<i class="fa fa-cube"></i>', 'match-five'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['<i class="fa fa-leaf"></i>', 'match-six'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['<i class="fa fa-bicycle"></i>', 'match-seven'], ['<i class="fa fa-bomb"></i>', 'match-eight'], ['<i class="fa fa-bomb"></i>', 'match-eight']];


// Global variables
const allCards = document.querySelector('.game-board');
const menuButtonContainer = document.querySelector('.game-choice');
let openCards = [];
let timeCounter = 0;
let countStars = 0;
let remainingStars = 5;
let timer = 0;
let points = 0;
let matches = 0;
let countMoves = 0;
let leaderBoardStorage = window.localStorage;
let bestTime = 15;


/*-------------------------------------------------------------
      			           Audio
  -----------------------------------------------------------*/
const audioBank = {
	click_sfx: new Audio('static/audio/card_click.mp3'),
	win_sfx: new Audio('static/audio/game_win.mp3'),
	lose_sfx: new Audio('static/audio/game_lose.mp3')
};

const clickSound = () => audioBank.click_sfx.play();
const winSound = () => audioBank.win_sfx.play();
const loseSound = () => audioBank.lose_sfx.play();


/*-------------------------------------------------------------
      			 Winner and Loser announcements
  -----------------------------------------------------------*/
// Winner announcement
const endGameAlertWinner = () => {
	console.log('winner message is called');
	const winMessage = `Winner!  Winner!
					 In ${countMoves} moves you earned ${points} points.
					 Your time was ${timeCounter} seconds
					 and you still have ${remainingStars} stars
					 Best Time is ${bestTime}`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = winMessage;
	winSound();
};


// Looser announcement
const endGameAlertLoser = () => {
	console.log('loser message is called');
	const loseMessage = `Game over!  Game over!
						 Oh no! You have  ${remainingStars}  stars!
					     In ${countMoves} moves you earned ${points} points.
					     Your time was ${timeCounter} seconds.
					     Best Time is ${bestTime}`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = loseMessage;
	loseSound();
};


const removeGameAlertLoser = () => {
	const message = document.querySelector('.message-container');
	message.classList.remove('show-message');
	message.classList.add('remove-message');

	// Prevent clicks until game starts again
	// $('#game-freeze').prop("disabled", true);
	// document.querySelector('#game-freeze div').disabled=true;

    console.log('Removed message.');
};


/*-------------------------------------------------------------
       Use local storage for Leader board
  -----------------------------------------------------------*/
const updateLeaderBoard = (timeCounter) => {
	let oldTime = localStorage.getItem("topPlayer");

	// Accesses current domain's localStorage object and add best player time to it
	if (oldTime === null) {
		leaderBoardStorage.setItem("topPlay", JSON.stringify(timeCounter));
		bestTime = timeCounter;
		console.log(`first leaderBoard value ${timeCounter}`);
	} else if (oldTime > timeCounter) {
		leaderBoardStorage.setItem("topPlayer", JSON.stringify(timeCounter));
		bestTime = timeCounter;
		console.log(`new time for leaderBoard ${timeCounter}`);
	} else {
		let remainingBestTime = JSON.parse(localStorage.getItem("topPlayer"));
		console.log(`localStorage stays with ${remainingBestTime}`);
	}
};


/*-------------------------------------------------------------
  How long each player takes to match all of the matches
  -----------------------------------------------------------*/
const stopTimer = () => clearInterval(timer);


const startTimer = () => timer = setInterval(timerCount, 1000);


const timerCount = () => {
	timeCounter += 1;
	$('.stop-watch').html(`${timeCounter}`);
	// console.log(timeCounter);
};


/*-------------------------------------------------------------
  		Counts the points earned per match
  -----------------------------------------------------------*/
const addPoints = () => {
	points += 10;
	$('.point-count').html(points);
	return points;
};


const losePoints = () => {
	points -= 1;
	$('.point-count').html(points);
	return points;
};


/*-------------------------------------------------------------
  		Count each match, ends game at 8 matches
  -----------------------------------------------------------*/
const countMatches = () => {
	matches += 1;
	if (matches === 8) {
		stopTimer();
		updateLeaderBoard(timeCounter);
		console.log('all cards are matched');
		endGameAlertWinner();
	}
};


/*-------------------------------------------------------------
  		Counts the moves done to match all cards
  -----------------------------------------------------------*/
const moveCounter = () => {
	countMoves += 1;
	$('.move-counter').html(countMoves);
	console.log('these are the moves baby: ' + countMoves);
	return countMoves;
};


/*-------------------------------------------------------------
 		        Deleting and replacing stars
  -----------------------------------------------------------*/
// After three missed matches, delete a star
const starCounter = () => {

	countStars += 1;

	if (countStars === 3) {
		$('ul .star-holder:first-child').remove();
		countStars = 0;
		remainingStars -= 1;
			if (remainingStars === 0) {
		    	stopTimer();
		    	updateLeaderBoard(timeCounter);
		    	endGameAlertLoser();
			}
	}
};


const returnStars = () => {
	$('.stars').append(`<ul class="stars-container">`);

	for (let i = 0; i <= 4; i++) {
		const stars = $(`<li class="star-holder"><i class="fa fa-star"></i></li>`);
		const starsContainer = $('.stars-container');
		starsContainer.append(stars);
	}
};


const clearRemainingStars = ()  => {
	if (remainingStars > 0) {
		 $('.stars-container').detach();
	}
};


/*-------------------------------------------------------------
 					Card logic (game logic)
  -----------------------------------------------------------*/
// Checks if cards match, if not turn back over
const compareCards = () => {
	// Compares the cards using data-match attribute
	if (openCards[0].dataset.match === openCards[1].dataset.match) {
		// console.log(openCards.dataset.match);

		// Add 10 points for each correct match
		addPoints();

		// Count each match, at eight matches end game
		countMatches();

		// Count how many times clicked pair until all matched
		moveCounter();

		// Adds classes, turns over cards
		openCards[0].classList.remove('open');
		openCards[0].classList.remove('show');
		openCards[0].classList.add('match');


		openCards[1].classList.remove('open');
		openCards[1].classList.remove('show');
		openCards[1].classList.add('match');

		// Clears out the array for the next turn after a match
		openCards.splice(0, openCards.length);


	} else {
		starCounter();
		moveCounter();

		// If cards don't match, turns the cards back over and removes classes.
		setTimeout(function () {
			openCards.forEach(function (card) {
				card.classList.remove('open', 'show');
			});
			// Lose point for miss
			losePoints();
			// Clears out the array for the next turn
			openCards.splice(0, openCards.length);
		}, 1000);

	}
};


// Turn two cards over
const turnCardOver = (event) => {
	// from mentor, but only partly works--need to figure out
	// if ($('.show').length > 1) {
	// 	return true;
	// }

	clickSound();
	event.target.classList.add('open', 'show');
	openCards.push(event.target);

	if (openCards.length === 2) {
	// $(openCards).attr("disabled", "disabled");

		compareCards();
	}
};


// Add event listener for click to turn over the cards
const addListener = () => {
	allCards.addEventListener('click', turnCardOver);
};

// Remove event listener so click event doesn't happen until game starts
const removeListener = () => {
	allCards.removeEventListener('click', turnCardOver);
};


/*-------------------------------------------------------------
 		Builds the game board
  -----------------------------------------------------------*/
const buildGameBoard = (gameChoice) => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let item of gameChoice) {
		// console.log(game);
		let buildBoxes = `<li class="card box" data-match=${item[1]}>${item[0]}</li>`;
		gameBoard.append(buildBoxes);

	}
	addListener();
};


// Shuffle function from http://stackoverflow.com/a/2450976
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


// Reset the game, clears timer and points, resets stars, removes looser message
$(document).ready(function() {
	$('.reset-button').on('click', () => {
		openCards.splice(0, openCards.length);
		timeCounter = 0;
		timer = 0;
		countStars = 0;
		remainingStars = 5;
		points = 0;
		matches = 0;
		countMoves = 0;

		// reset DOM for the control panel
		$('.stop-watch').html(timeCounter);
		$('.point-count').html(points);
		$('.card').removeClass('open show');

		// Prevent clicks until game starts again | all three below don't work, still working on it
		// $('.game-board').prop("disabled", true);
		// document.querySelector('.game-board').disabled=true;
		// $('game-board').attr("disabled", true);

		removeListener();
		clearRemainingStars();
		returnStars();
		removeGameAlertLoser();
		$('.game-board').empty();
		clickSound();
		menuButtonContainer.classList.remove('hide-container');
	});
});


// Choose which type of game to play and start game
$(function() {
	$('.word-word-button').on('click', () => {
		clickSound();
		shuffle(animals);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});

});


$(document).ready(function() {
	$('.pict-word-button').on('click', () => {
		clickSound();
		shuffle(wordPicture);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});
});


$(function() {
	$('.pict-pict-button').on('click', () => {
		clickSound();
		shuffle(picturePicture);
		startTimer();
		menuButtonContainer.classList.add('hide-container');
	});

});
