var Tileboard = (function() {
  var Tileboard = function Tileboard(table) {
    this.table = $(table)[0];
    this.table.tileboard = this;
    this._fillBoard();
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
    },
    _fillBoard: function() {
      var BOARD_WIDTH = 8;
      var BOARD_HEIGHT = 8;
      var LETTERS = "abcdefgh";
      var TAB_SIZE = 2;
      var baseIndent = 0;
      var table = $(this.table);
      var rows = $('tr', table).remove();
      var indent = function(num) {
        var parts = ['\n'];
        for (var i = 0; i < baseIndent + num * TAB_SIZE; i++)
          parts.push(' ');
        return document.createTextNode(parts.join(''));
      };

      if (table[0].previousSibling &&
          table[0].previousSibling.nodeType === Node.TEXT_NODE) {
        baseIndent = table[0].previousSibling.nodeValue.split('\n')
          .slice(-1)[0].length;
      }
      table.empty();
      
      for (var y = 0; y < BOARD_HEIGHT; y++) {
        var rowNum = BOARD_HEIGHT - y;
        var row = rows.filter('.row-' + rowNum);
        var rowCells = $('td', row).remove();

        row.empty();
        if (!row.length)
          row = $('<tr></tr>').addClass('row-' + rowNum);

        table.append(indent(1)).append(row);

        for (var x = 0; x < BOARD_WIDTH; x++) {
          var id = LETTERS[x] + rowNum;
          var td = rowCells.filter('.' + id);
          
          if (!td.length)
            td = $('<td></td>');

          td.addClass("col-" + LETTERS[x]).addClass(id);
          row.append(indent(2)).append(td);
        }
        row.append(indent(1));
      }
      table.append(indent(0));
    }
  };
  
  return Tileboard;
})();
