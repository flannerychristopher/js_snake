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
  position: [20,20],

  render: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    console.log(this.position);
    snakeHead.style.backgroundColor = 'red';
  },

  move: function(key) {
    let snakeHead = document.getElementById( this.position.toString() );
    snakeHead.style.backgroundColor = 'white';

    if (key === 38) { // move up
      this.position[0]--;
    } else if (key === 39) { // move right
      this.position[1]++;
    } else if (key === 40) { // move down
      this.position[0]++;
    } else if (key === 37) { // move left
      this.position[1]--;
    }

    this.render();
  }

};

document.addEventListener('keydown', function(key) {
  key = key || window.event;
  // console.log(key.keyCode);
  if (key.keyCode === 38) { // up arrow
    console.log('up');
    snakeObj.move(38);
  } else if (key.keyCode === 39) { // right arrow
    console.log('right');
    snakeObj.move(39);
  } else if (key.keyCode === 40) { // down arrow
    console.log('down');
    snakeObj.move(40);
  } else if (key.keyCode === 37) {
    console.log('left');
    snakeObj.move(37);
  }
});

gridObj.render();
snakeObj.render();
let timer = setInterval(snakeObj.move, 500);
