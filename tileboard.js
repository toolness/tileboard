var Tileboard = (function() {
  var Tileboard = {
    makeEmptyBoard: function makeEmptyBoard() {
      var BOARD_WIDTH = 8;
      var BOARD_HEIGHT = 8;
      var LETTERS = "abcdefgh";
      var table = document.createElement("table");

      table.classList.add("board");

      for (var y = 0; y < BOARD_HEIGHT; y++) {
        var row = document.createElement("tr");

        table.appendChild(row);

        for (var x = 0; x < BOARD_WIDTH; x++) {
          var td = document.createElement("td");
          var id = LETTERS[x] + (BOARD_HEIGHT - y);

          td.setAttribute("id", id);
          td.setAttribute("title", id);
          td.classList.add("col-" + LETTERS[x]);
          td.classList.add("row-" + (BOARD_HEIGHT - y));
          row.appendChild(td);
        }
      }

      return table;
    }
  };
  
  return Tileboard;
})();
