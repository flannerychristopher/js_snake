const contentElement = document.getElementById('content');

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
  position: [ [20,20], [20,19], [20,18] ],
  direction: 39,

  render: function() {
    this.position.forEach( (item) => {
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
        intervalOn ? this.stop() : this.start();
      }
    });
  },

  start: function() {
    interval = setInterval( () => { snakeObj.move() }, 200);
    intervalOn = true;
  },

  stop: function() {
    clearInterval(interval);
    intervalOn = false;
  },

  checkMove: function() { // returns true if move is legal
    let snakeHead = this.position[0].join(); // head as a string
    let snakeBody = this.position.slice(1).join('-'); // body as a string
    if ( snakeHead.includes(40) || snakeHead.includes(-1) ) { // off the board
      return false;
    } else if (snakeBody.includes(snakeHead)) { // snake hits itself
      return false;
    } else {
      return true;
    }
  },

  move: function() {
    let snakeTailId = this.position[this.position.length - 1].toString();
    document.getElementById(snakeTailId).style.backgroundColor = 'white';
    this.position.pop();

    if (this.direction === 38) { // up
      this.position.unshift( [ this.position[0][0] - 1, this.position[0][1] ] );

    } else if (this.direction === 39) { // right
      this.position.unshift( [ this.position[0][0], this.position[0][1] + 1 ] );

    } else if (this.direction === 40) { // down
      this.position.unshift( [ this.position[0][0] + 1, this.position[0][1] ] );

    } else if (this.direction === 37) { // left
      this.position.unshift( [ this.position[0][0], this.position[0][1] - 1 ] );
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
snakeObj.listen();
let interval = setInterval(() => { snakeObj.move() }, 200);
let intervalOn = true;
