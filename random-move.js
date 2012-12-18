var randomMove = (function() {
  function getRandomChoice(arrayLike) {
    var index = getRandomInt(0, arrayLike.length-1);
    return arrayLike[index];
  }

  // Returns a random integer between min and max
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return function randomMove(node) {
    var cell = node.parentNode;
    var table = cell.parentNode.parentNode;
    var randomRow = getRandomChoice(table.childNodes);
    var randomCell = getRandomChoice(randomRow.childNodes);
    if (randomCell === cell)
      return randomMove(node);
    var old = randomCell.replaceChild(node, randomCell.firstChild);
    cell.appendChild(old);
  };
})();
