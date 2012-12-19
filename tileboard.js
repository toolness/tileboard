var Tileboard = (function() {
  var Tileboard = function Tileboard(table) {
    this.table = table;
    table.tileboard = this;
  };
  
  Tileboard.prototype = {
    isPaused: false,
    setPaused: function setPaused(value) {
      if (value != this.isPaused) {
        this.isPaused = !!value;
        $(this.table).trigger('tileboard:change:isPaused');
      }
    },
    on: function(event, handler) {
      $(this.table).on('tileboard:' + event, handler);
    }
  };
  
  Tileboard.makeEmptyBoard = function makeEmptyBoard() {
    var BOARD_WIDTH = 8;
    var BOARD_HEIGHT = 8;
    var LETTERS = "abcdefgh";
    var table = document.createElement("table");
    var txt = function(str) { return document.createTextNode(str); };
    
    table.classList.add("board");

    for (var y = 0; y < BOARD_HEIGHT; y++) {
      var row = document.createElement("tr");

      table.appendChild(txt("\n  "));
      table.appendChild(row);

      for (var x = 0; x < BOARD_WIDTH; x++) {
        var td = document.createElement("td");
        var id = LETTERS[x] + (BOARD_HEIGHT - y);

        td.setAttribute("title", id);
        td.classList.add("col-" + LETTERS[x]);
        td.classList.add("row-" + (BOARD_HEIGHT - y));
        td.classList.add(id);
        row.appendChild(txt("\n    "));
        row.appendChild(td);
      }
      row.appendChild(txt("\n  "));
    }

    table.appendChild(txt("\n"));
    
    return table;
  };
  
  return Tileboard;
})();
