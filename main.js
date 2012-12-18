"use strict";

window.addEventListener("DOMContentLoaded", function() {
  var makeDefaultBoard = function() {
    var table = Tileboard.makeEmptyBoard();
    var piece = document.createElement("img");
    piece.classList.add("random-mover");
    piece.src = "https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png";
    table.querySelector("#a1").appendChild(piece);
    document.getElementById("board-holder").appendChild(table);
    
    return table;
  };
  var table = document.querySelector(".board") || makeDefaultBoard();
  var smoothifyObserver = Tileboard.smoothifyMovement(table);
  var css = document.getElementById("css");
  var style = document.querySelector("style");
  
  css.value = style.textContent;
  css.onchange = css.onkeyup = function() {
    style.textContent = this.value;
  };
  
  Tileboard.on('change:isPaused', function() {
    if (Tileboard.isPaused)
      document.body.classList.add("paused");
    else
      document.body.classList.remove("paused");
  });

  document.getElementById("edit-css").onclick = function() {
    document.body.classList.toggle("editing-css");
  };
  
  document.getElementById("pause").onclick = function() {
    Tileboard.setPaused(!Tileboard.isPaused);
  };
  
  window.webxrayWhenGogglesLoad = function(ui) {
    var oldPauseState = Tileboard.isPaused;
    Tileboard.setPaused(true);
    ui.on('quit', function() {
      Tileboard.setPaused(oldPauseState);
    });
  };
}, false);
