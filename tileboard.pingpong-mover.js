(function() {
  function pingPong(event, fromTileId) {
    var table = $(event.target).closest("table")[0];
    if (table && table.tileboard)
      table.tileboard.move(event.target, fromTileId);
  }
  
  $(window).on("jsmovingend", ".pingpong-mover", pingPong);
})();
