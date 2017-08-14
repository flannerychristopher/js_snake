const contentElement = document.getElementById('content');
const pauseButton = document.getElementById('pause');
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
  position: [20,20],
  direction: 39,

  render: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    console.log(this.position);
    snakeHead.style.backgroundColor = 'red';
  },

  move: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    snakeHead.style.backgroundColor = 'white';

    document.addEventListener('keydown', function(key) {
      key = key || window.event;
      if (key.keyCode === 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40) {
        snakeObj.direction = key.keyCode;
      }
    });

    if (this.direction === 38) { // up
      this.position[0]--;
    } else if (this.direction === 39) { // right
      snakeObj.position[1]++;
    } else if (this.direction === 40) { // down
      snakeObj.position[0]++;
    } else if (this.direction === 37) { // left
      snakeObj.position[1]--;
    }

    this.render();
  }

};



gridObj.render();

let interval = setInterval(() => { snakeObj.move() }, 200);

startButton.addEventListener('click', () => {
  interval = setInterval(() => { snakeObj.move() }, 200);
});

pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});
