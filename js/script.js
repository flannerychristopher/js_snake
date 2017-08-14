const contentElement = document.getElementById('content');
const startButton = document.getElementById('start');

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
      box.style.backgroundColor = 'red';
    });
  },

  move: function() {
    document.addEventListener('keydown', function(key) {
      key = key || window.event;
      console.log(key.keyCode);
      if (key.keyCode === 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40) {
        snakeObj.direction = key.keyCode;
      } else if (key.keyCode === 32) { // spacebar pauses the game
        clearInterval(interval);
      }
    });

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
    this.render();
    console.log(interval);
  },
};

// listenerstimer, and rendering

startButton.addEventListener('click', () => {
  interval = setInterval(() => { snakeObj.move() }, 200);
});

gridObj.render();
let interval = setInterval(() => { snakeObj.move() }, 200);
