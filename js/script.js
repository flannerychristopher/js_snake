const contentElement = document.getElementById('content');

const scoreElement = document.getElementById('score');
let score = 0;

const gridObj = {
  render: function() {
    for (let x =  0; x < 40; x++) {
      for (let y = 0; y < 40; y++) {
        let divElement = document.createElement('div');
        divElement.id = `${x},${y}`;
        divElement.classList.add('box');
        contentElement.appendChild(divElement);
      }
    }
  }
};

const snakeObj = {
  location: [ [20,20], [20,19], [20,18] ],
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
    interval = setInterval( () => { snakeObj.move() }, 150);
    intervalOn = true;
  },

  stop: function() {
    clearInterval(interval);
    intervalOn = false;
  },

  grow: function() {
    let snakeTail = this.location[this.location.length - 1];
    let snakeHead = this.location[0];

    if (this.direction === 38) { // up
      // this.location.push( [ snakeTail[0] + 1, snakeTail[1] ] );
      this.location.unshift( [snakeHead[0] - 1, snakeHead[1]] );
    } else if (this.direction === 39) { // right
      // this.location.push( [ snakeTail[0], snakeTail[1] - 1 ] );
      this.location.unshift( [snakeHead[0], snakeHead[1] + 1] );
    } else if (this.direction === 40) { // down
      // this.location.push( [ snakeTail[0] - 1, snakeTail[1] ] );
      this.location.unshift( [snakeHead[0] + 1, snakeHead[1] ] );
    } else if (this.direction === 37) { // left
      // this.location.push( [ snakeTail[0], snakeTail[1] + 1 ] );
      this.location.unshift( [snakeHead[0], snakeHead[1] - 1] );
    }
  },

  checkMove: function() { // returns true if move is legal
    let snakeHead = this.location[0].join(); // head as a string
    let snakeBody = this.location.slice(1).join('-'); // body as a string
    let food = foodObj.location.join(); // food location as a string

    if ( snakeHead.includes(40) || snakeHead.includes(-1) ) { // off the board
      return false;
    } else if (snakeBody.includes(snakeHead)) { // snake hits itself
      return false;
    } else if (snakeHead === food) { // snake eats food
      score += 100;
      scoreElement.textContent = score;

      this.grow();
      foodObj.render();
      return true;
    } else { // normal move
      return true;
    }
  },

  move: function() {
    let snakeTailId = this.location[this.location.length - 1].toString();
    document.getElementById(snakeTailId).style.backgroundColor = 'white';
    this.location.pop();
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

    this.checkMove() ? this.render() : this.stop();
  },
};

const foodObj = {
  location: [],

  randomNumber: function() {
    return Math.floor(Math.random() * 40);
  },

  newRandomLocation: function() {
    this.location = [this.randomNumber(), this.randomNumber()] ;
  },

  render: function() {
    this.newRandomLocation();
    let foodElementId = this.location.toString();
    let foodElement = document.getElementById(foodElementId);
    foodElement.style.backgroundColor = '#ec3f3f';
  }
};

// interval, key handling/listening and rendering

gridObj.render();
foodObj.render();
snakeObj.listen();
let interval = setInterval(() => { snakeObj.move() }, 150);
let intervalOn = true;

// remove later
