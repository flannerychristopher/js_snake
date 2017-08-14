window.onload = function() {
  let contentElement = document.getElementById('content');

  (function render() {
    for (i = 0; i < 1600; i++) {
      let divElement = document.createElement('div');
      divElement.id = 'box' + i;
      // divElement.style.display = 'inline-block';
      divElement.style.float = 'left';
      divElement.style.border = '.2px solid black';
      // divElement.style.color = 'black';
      divElement.style.height = '20px';
      divElement.style.width = '20px';


      contentElement.appendChild(divElement);
    }
  })();

}
