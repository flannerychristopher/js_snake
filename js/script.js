const contentElement = document.getElementById('content');
const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const speedElement = document.getElementById('speed');
const playElement = document.getElementById('play');
let score = 0,
    speed = 150,
    interval,
    intervalOn;

const gridObj = {
  render: function() {
    for (let x =  0; x < 40; x++) {
      for (let y = 0; y < 40; y++) {
        let divElement = document.createElement('div');
        divElement.id = `${x},${y}`;
        divElement.style.height = '20px';
        divElement.style.width = '20px';
        divElement.style.float = 'left';
        divElement.style.backgroundColor = '#fff';
        gridElement.appendChild(divElement);
      }
    }
  }
};

const snakeObj = {
  location: [],
  direction: 39,

  render: function() {
    this.location.forEach( (item) => {
      let box = document.getElementById(item.toString());
      box.style.backgroundColor = '#75db37';
    });
  },

  listen: function() { // listen for keyboard input
    document.addEventListener('keyup', (key) => {
      key = key || window.event;
      // console.log(key.keyCode);
      if (key.keyCode === 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40) {
        snakeObj.direction = key.keyCode;
      } else if (key.keyCode === 32) { // spacebar pauses the snake
        console.log('spacebar');
        intervalOn ? this.stop() : this.start();
      }
    });
  },

  start: function() {
    clearInterval(interval);
    interval = setInterval( () => { snakeObj.move() }, speed);
    console.log('start');
    intervalOn = true;
  },

  stop: function() {
    clearInterval(interval);
    console.log('stop');
    intervalOn = false;
  },

  checkMove: function() { // returns true if move is legal
    let snakeHead = this.location[0];
    let snakeBody = this.location.slice(1);
    let food = foodObj.location;

    if ( snakeHead.includes(40) || snakeHead.includes(-1) ) { // off the board
      return false;
    } else if ( snakeBody.join(' ').includes(` ${snakeHead} `) ) { // snake hits itself
      console.log('hit self');
      return false;
    } else if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) { // snake eats food
      console.log('munch');
      foodObj.render();
      speed -= 5;
      speedElement.textContent = (1000 / speed * 20).toFixed(2);
      score += Math.ceil(1000 / speed) * 10;
      scoreElement.textContent = score;
      this.start();
      return true;
    } else { // normal move
      let snakeTailId = this.location[this.location.length - 1].toString();
      document.getElementById(snakeTailId).style.backgroundColor = 'white';
      this.location.pop();
      return true;
    }
  },

  move: function() {
    let snakeHead = this.location[0];

    if (this.direction === 38) { // up
      this.location.unshift( [ snakeHead[0] - 1, snakeHead[1] ] );
    } else if (this.direction === 39) { // right
      this.location.unshift( [ snakeHead[0], snakeHead[1] + 1 ] );
    } else if (this.direction === 40) { // down
      this.location.unshift( [ snakeHead[0] + 1, snakeHead[1] ] );
    } else if (this.direction === 37) { // left
      this.location.unshift( [ snakeHead[0], snakeHead[1] - 1 ] );
    }

    this.checkMove() ? this.render() : this.gameOver();
  },

  gameOver: function() {
    this.stop();
    playElement.textContent = 'game over. play again?';
  }
};

const foodObj = {
  location: [],

  randomNumber: function() {
    return Math.floor(Math.random() * 40);
  },

  newRandomLocation: function() {
    // this.location = [this.randomNumber(), this.randomNumber()] ;
    let snakeString = snakeObj.location.join(' ');
    let newLocation = [this.randomNumber(), this.randomNumber()] ;
    if ( !snakeString.includes( newLocation.toString() ) ) {
      this.location = newLocation;
    } else {
      this.newRandomLocation();
    }
  },

  render: function() {
    this.newRandomLocation();
    let foodElementId = this.location.toString();
    let foodElement = document.getElementById(foodElementId);
    foodElement.style.backgroundColor = '#ec3f3f';
  },

  test: function() {
    let firstNumbers = [];
    let secondNumbers = [];

    snakeObj.location.forEach ( (item) => {

      if ( !firstNumbers.includes(item[0]) ) firstNumbers.push(item[0]);
      secondNumbers.push(item[1]);
      // console.log(item);
    });
    console.log(firstNumbers.toString());
    console.log(secondNumbers.toString());

  }

};

// interval, key handling/listening and rendering

snakeObj.listen();

playElement.onclick = function() {
  console.log('newgame');
  snakeObj.location = [ [20,20], [20,19], [20,18], [20,17], [20,16], [20,15] ];
  snakeObj.direction = 39;

  gridElement.innerHTML = '';
  gridObj.render();
  score = 0;
  scoreElement.textContent = score;
  speed = 150;
  speedElement.textContent = '133.33';
  playElement.textContent = '';

  foodObj.render();

  interval = setInterval(() => { snakeObj.move() }, speed);
  intervalOn = true;
}
