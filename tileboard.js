"use strict";

// Tileboard is a hackable game micro-framework for simple discrete,
// tile-based games that is designed to invite people to learn about game
// design, HTML, CSS, and/or JavaScript. For more information on the vision
// and goals, see the [README][].
//
// This project is [hosted on Github][github] and has a [test suite][tests].
// It is available under the MIT license.
//
// Tileboard's only dependency is [jQuery][] or [Zepto][].
//
// Presently, the only example of Tileboard in use is [Laserloaf][].
//
//   [README]: https://github.com/toolness/tileboard#readme
//   [jQuery]: http://jquery.com/
//   [Zepto]: http://zeptojs.com/
//   [github]: https://github.com/toolness/tileboard
//   [tests]: test/
//   [Laserloaf]: examples/laserloaf/

var Tileboard = (function() {
  var DEFAULT_WIDTH = 8;
  var DEFAULT_HEIGHT = 8;
  var LETTERS = "abcdefghijklmnopqrstuvwxyz";
  
  // ## The Tileboard Constructor
  //
  // The constructor takes only one argument: a jQuery instance or
  // DOM element representing the `<table>` element to use for the
  // board.
  var Tileboard = function Tileboard(table) {
    if (!table) table = {};
    if ($.isPlainObject(table)) table = tableFromOptions(table);
    this.table = $(table)[0];
    this.width = parseInt($(table).attr("data-width") || DEFAULT_WIDTH);
    this.height = parseInt($(table).attr("data-height") || DEFAULT_HEIGHT);
    this.table.tileboard = this;
    if (this.width > LETTERS.length)
      throw new Error("table is too wide");
    this._fillBoard();
    $(this.table).trigger("tileboard:activate");
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
    move: function(pieces, dest) {
      if (typeof(pieces) == "string")
        pieces = this.pieces(pieces);
      else
        pieces = $(pieces);
      $("." + dest, this.table).append(pieces);
    },
    pieces: function(tile) {
      return $("." + tile + " > *", this.table);
    },
    tile: function(piece) {
      if (!(piece instanceof Element) && piece.get)
        piece = piece.get(0);
      return piece.parentNode.tileId;
    },
    _fillBoard: function() {
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
      
      for (var y = 0; y < this.height; y++) {
        var rowNum = this.height - y;
        var row = rows.filter('.row-' + rowNum);
        var rowCells = $('td', row).remove();

        row.empty();
        if (!row.length)
          row = $('<tr></tr>').addClass('row-' + rowNum);

        table.append(indent(1)).append(row);

        for (var x = 0; x < this.width; x++) {
          var id = LETTERS[x] + rowNum;
          var td = rowCells.filter('.' + id);
          
          if (!td.length)
            td = $('<td></td>');

          td.addClass("col-" + LETTERS[x]).addClass(id);
          td[0].tileId = id;
          row.append(indent(2)).append(td);
        }
        row.append(indent(1));
      }
      table.append(indent(0));
    }
  };
  
  var tableFromOptions = function(options) {
    var table = $('<table class="board"></table>');
    
    if (options.width) table.attr("data-width", options.width);
    if (options.height) table.attr("data-height", options.height);

    return table;
  };
  
  $(window).ready(function() {
    $(".board").each(function() {
      if (!this.hasAttribute("data-no-auto-activate"))
        new Tileboard(this);
    });
  });
  
  return Tileboard;
})();
