(function(Tileboard) {
  function getRandomChoice(arrayLike) {
    var index = getRandomInt(0, arrayLike.length-1);
    return arrayLike[index];
  }

  // Returns a random integer between min and max
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomMove(tileboard, node) {
    var cell = node.parentNode;
    var table = cell.parentNode.parentNode;
    var randomRow = getRandomChoice(table.children);
    var randomCell = getRandomChoice(randomRow.children);
    
    if (tileboard.isPaused)
      return;
    if (randomCell === cell || randomCell.children.length)
      return randomMove(tileboard, node);
    randomCell.appendChild(node);
  };
  
  setInterval(function() {
    $("table.board").each(function(i, table) {
      if (table.tileboard)
        $(".random-mover", table).each(function() {
          randomMove(table.tileboard, this);
        });
    });
  }, 2000);
})(Tileboard);
