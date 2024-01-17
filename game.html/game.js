const restartButton = document.querySelector('.header-about__btn');
const activeBox = document.querySelector('.number-box');
const answer = document.querySelector('.number-box__icon');
const answerInput = document.querySelector('.user-number__inpt');
const checkButton = document.querySelector('.user-number__check');
const bodyBackground = document.querySelector('body');
const countWrongAnswers = document.querySelector('.user-attempts__count');
const countBestScore = document.querySelector('.user-attempts__bestresult');
const countScores = document.querySelector('.user-attempts');
const randomNumber = Math.floor(Math.random() * 50);
let clickCount = 0;
let bestScore = Number(localStorage.getItem('best')) || 0;

const getNewCount = (count) => {
	countWrongAnswers.innerHTML = `<p class="user-attempts__count">
    Score: ${count}</p>`;
};
const reloadBestScore = (number) => {
	countBestScore.innerHTML = `<p class="user-attempts__count">
    Best score: ${number}</p>`;
};
const bestCount = () => {
	if (bestScore >= clickCount) {
		localStorage.setItem('best', clickCount);
		bestScore = clickCount;
		reloadBestScore(localStorage.best);
	} else if (bestScore < clickCount) {
		getNewCount(clickCount);
	} else {
		reloadBestScore(0);
	}
};
const reloadBox = (firstBox, secondBox, thirdBox, someText) => {
	activeBox.classList.remove(firstBox);
	activeBox.classList.remove(secondBox);
	activeBox.classList.add(thirdBox);
	answer.innerHTML = `<p class='number-box__text'>${someText}</p>`;
};

const clickOnCheckButton = () => {
	if (randomNumber === parseInt(answerInput.value)) {
		reloadBox('box_blue', 'box_red', 'box_correct_answer', 'Correct!');
		!bestScore ? (bestScore = clickCount) : '';
		bestCount();
	} else if (randomNumber === null) {
		return;
	} else {
		clickCount += 1;
		getNewCount(clickCount);
		if (randomNumber < parseInt(answerInput.value)) {
			reloadBox('box_red', 'box_blue', 'box_red', 'This is a lot..');
			activeBox.classList.remove('box_correct_answer');
		} else if (randomNumber > parseInt(answerInput.value)) {
			reloadBox(
				'box_blue',
				'box_red',
				'box_blue',
				'This value is too small'
			);
			activeBox.classList.remove('box_correct_answer');
		}
	}
};
const clickOnRestartButton = () => {
	location.reload();
};

function guessTheNumber() {
	localStorage.best ? reloadBestScore(localStorage.best) : reloadBestScore(0);
	checkButton.addEventListener('click', clickOnCheckButton);
	restartButton.addEventListener('click', clickOnRestartButton);
}
guessTheNumber();
