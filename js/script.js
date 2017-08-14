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

  renderSnake: function() {
    let snakeHead = document.getElementById( this.position.toString() );
    console.log(this.position);
    snakeHead.style.backgroundColor = 'red';
  },

  moveR: function() {
    this.position[1]++;
    this.renderSnake;
  }

};

window.onload = () => {
  gridObj.renderGrid();
  // snakeObj.renderSnake();
};
