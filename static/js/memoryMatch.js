"use strict";


// const animals = ["tiger", "tiger", "elephant", "elephant", "peacock", "peacock", "turtle", "turtle"];
const animals = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];

const animalPics = [["tiger", "match-one"], ["tiger", "match-one"], ["elephant", "match-two"], ["elephant", "match-two"], ["peacock", "match-three"], ["peacock", "match-three"], ["turtle", "match-four"], ["turtle", "match-four"],["swan", "match-five"], ["swan", "match-five"], ["wolf", "match-six"], ["wolf", "match-six"], ["dolphin", "match-seven"], ["dolphin", "match-seven"], ["alien", "match-eight"], ["alien", "match-eight"] ];

// Global variables
const allCards = document.querySelector('.game-board');
let openCards = [];
let timeCounter = 0;
let countStars = 0;
let remainingStars = 5;
let timer = 0;
let points = 0;
let matches = 0;
let countMoves = 0;
let leaderBoardStorage = window.localStorage;


/*-------------------------------------------------------------
      			 Winner and Loser announcements
  -----------------------------------------------------------*/
// Winner announcement
const endGameAlertWinner = () => {
	console.log('winner message is called');
	const winMessage = `Winner!  Winner!
					 In ${countMoves} moves you earned ${points} points.
					 Your time was ${timeCounter} seconds
					 and you still have ${remainingStars} stars`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = winMessage;
};


// Looser announcement
const endGameAlertLoser = () => {
	console.log('loser message is called');
	const loseMessage = `Game over!  Game over! 
						 Oh no! You have  ${remainingStars}  stars!
					     In ${countMoves} moves you earned ${points} points.
					     Your time was ${timeCounter} seconds`;

	const messageContainer = document.querySelector('.message-container');
	messageContainer.classList.remove('remove-message');
	messageContainer.classList.add('show-message');

	const messageHeading = document.querySelector('.endgame-message');
	messageHeading.innerText = loseMessage;
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
const makeLeaderBoard = () => {
	// Accesses current domain's localStorage object and adds a data item to it
     leaderBoardStorage.setItem('topPlayer', 'Tom');
     // Reading localStorage
	let stats = localStorage.getItem('topPlayer');


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
	timeCounter += 1;
	$('.stop-watch').html(`${timeCounter}`);
	console.log(timeCounter);
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
		console.log('all cards are matched');
		endGameAlertWinner();
		// add name and points the leader board
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

		// Clears out the array for the next turn after a match
		openCards.splice(0, openCards.length);

		// Adds classes, turns over cards
		// openCards[0].classList.add('match');
		// openCards[0].classList.add('open');
		// openCards[0].classList.add('show');
		//
		// openCards[1].classList.add('match');
		// openCards[1].classList.add('open');
		// openCards[1].classList.add('show');

	//	from tutor
		openCards[0].classList.add('match');
		openCards[0].classList.remove('open');
		openCards[0].classList.remove('show');

		openCards[1].classList.add('match');
		openCards[1].classList.remove('open');
		openCards[1].classList.remove('show');

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
	// if ($('.show').length > 1) {
	// 	return true;
	// }
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
const buildGameBoard = () => {
	const gameBoard = $('.game-board');

	gameBoard.empty();

	for (let animal of animals) {
		// console.log(animal);
		let buildBoxes = `<li class="card box" data-match=${animal[1]}>${animal[0]}</li>`;
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


// Reset the game, clears timer and points, resets stars, removes looser message
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

	// Prevent clicks until game starts again
	// $('.game-board').prop("disabled", true);
	// document.querySelector('.game-board').disabled=true;
	// $('game-board').attr("disabled", true);

	removeListener();
    clearRemainingStars();
	returnStars();
	removeGameAlertLoser();
	$('.game-board').empty();
});


// Click button to start game
$('.start-button').on('click', () => {
	shuffle(animals);
	startTimer();
});

