const contentElement = document.getElementById('content');

const gridObj = {
  renderGrid: function() {
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
  head: document.getElementById('2,3'),

  renderSnake: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    console.log(this.position);
    snakeHead.classList.add('snake');
  },

  moveR: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    snakeHead.classList.remove('snake');
    this.position[1]++;
    this.renderSnake();
  }

};

window.onload = () => {
  gridObj.renderGrid();
  snakeObj.renderSnake();
};

document.addEventListener('keydown', function(key) {
  key = key || window.event;
  // console.log(key.keyCode);
  if (key.keyCode == '38') { // up arrow
    console.log('up');
  } else if (key.keyCode == '39') { // right arrow
    console.log('right');
    snakeObj.moveR();
  } else if (key.keyCode == '40') { // down arrow
    console.log('down');
  } else if (key.keyCode == '37') {
    console.log('left');
  }
});
