(function(Tileboard) {

  function parseEvent(evt) {
    if (!(evt.metaKey || evt.altKey || evt.ctrlKey)) {
      var key = String.fromCharCode(evt.keyCode);
      return parseCommand(String.fromCharCode(evt.keyCode));
    }
  }

  function parseCommand(key) {
    var cmd = undefined;
    if(key.match(/[qweasdzxc]/i)) {
      cmd = { x: 0, y: 0 };
      if(key.match(/[qaz]/i)) cmd.x = -1;
      else if(key.match(/[edc]/i)) cmd.x = 1;
      if(key.match(/[zxc]/i)) cmd.y = -1;
      else if(key.match(/[qwe]/i)) cmd.y = 1;
    }
    return cmd;
  }

  function findLocation(node) {
    var classes = node.parentNode.classList;
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].match(/^[a-h][1-8]$/)) return classes[i];
    }
    return undefined;
  }

  function getCoords(start, delta) {
    var targ = String.fromCharCode(start[0].charCodeAt() + delta.x) 
      + (parseInt(start[1]) + delta.y);
    if(targ.match(/[a-h][1-8]/i)) {
      return targ;
    }
    else {
      return undefined;
    }
  }

  function move(node, delta) {
    var loc = findLocation(node);
    var targLoc = getCoords(loc, delta);
    if(targLoc) {
      var targ = document.querySelector('.board .' + targLoc);
      targ.appendChild(node);
    }
  }

  document.onkeydown = function(evt){
    if(!document.querySelector('.editing-css')){
      var delta = parseEvent(evt);
      if(delta) {
        move(document.querySelector('.board .loafcat'), delta);
        return false;
      }
    }
  };
})(Tileboard);
