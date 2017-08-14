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
  position: [ [20,20], [20,19], [20,18] ],
  direction: 39,

  render: function() {
    this.position.forEach( (item) => {
      let box = document.getElementById(item.toString());
      box.style.backgroundColor = 'red';
    });
  },

  move: function() {
    let snakeTailId = this.position[this.position.length - 1].toString();
    document.getElementById(snakeTailId).style.backgroundColor = 'white';
    console.log(snakeTailId);

    document.addEventListener('keydown', function(key) {
      key = key || window.event;
      if (key.keyCode === 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40) {
        snakeObj.direction = key.keyCode;
      }
    });

    if (this.direction === 38) { // up
      this.position.forEach( (item) => { item[0]--; });
    } else if (this.direction === 39) { // right
      this.position.forEach( (item) => { item[1]++; });
    } else if (this.direction === 40) { // down
      this.position.forEach( (item) => { item[0]++; });
    } else if (this.direction === 37) { // left
      this.position.forEach( (item) => { item[1]--; });
    }
    this.render();
  },
};

// listenerstimer, and rendering

startButton.addEventListener('click', () => {
  interval = setInterval(() => { snakeObj.move() }, 200);
});

pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});

gridObj.render();
let interval = setInterval(() => { snakeObj.move() }, 200);
