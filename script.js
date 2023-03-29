'use strict';

// Selecting Element (gọi phần tử vào biến const, vì phần tử của html là giá trị không đổi)

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Starting Conditions
const switchPlayer = function () {
  //Switch player to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0; //hàm này chỉ hiển thị ra string '0', muốn đưa giá trị current về số 0 thì cần phải có hàm bên dưới
  currentScore = 0; // biểu thức này làm cho current score trở về giá trị 0 ban đầu, nếu không có biểu thức này, giá trị của current score vẫn bị giữ nguyên cho đến lượt chơi tiếp theo__ điều này là đa mê =))
  activePlayer = activePlayer === 0 ? 1 : 0;

  //Switch COLOR when change player
  player0El.classList.toggle('player--active'); //toggle công tắc, sẽ bật active nếu chưa có class .active trong dòng html, sẽ tắt active nếu đã có class .active ()
  player1El.classList.toggle('player--active');
};

// Rolling dice functionaily: (phó từ chức năng) chức năng lăn xúc xắc
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll: xác định một giá trị xúc xắc dice bất kỳ
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1: kiem tra khi roll vao 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice; //đây chỉ là một biểu thức, muốn xuất ra browser cần trỏ đến phần tử DOM (current0El) và gán giá trị currentScore cho nó
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to total score on active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]; //chú ý khi gọi DOM đến .class hay #id
    //2.Check if player's score is <= 100;
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active'); //lệnh này để trở lại người chơi active-player ban đầu, css là một lớp trắng khó nhìn thấy qua lớp đen
      diceEl.classList.add('hidden');
    } else {
      //3. Switch player
      switchPlayer();
    }
  }
});

//When click to "New Game" button
btnNew.addEventListener('click', init);

// 初心者のプログラミング　笑
//When click to "New Game" button
// btnNew.addEventListener('click', function () {
//   scores = [0, 0];
//   score0El.textContent = scores[0];
//   score1El.textContent = scores[0];
//   currentScore = 0;
//   current0El.textContent = currentScore;
//   current1El.textContent = currentScore;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   diceEl.classList.remove('hidden');
//   if (activePlayer === 1) {
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.remove('player--active');
//     document.querySelector('.player--0').classList.add('player--active');
//   }
//   playing = true;
// });
