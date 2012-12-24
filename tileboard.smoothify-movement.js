(function(Tileboard) {
  var TRANSITION_EVENTS = "transitionend webkitTransitionEnd";
  var MutationObserver = (window.MutationObserver ||
                          window.WebKitMutationObserver ||
                          window.MozMutationObserver);

  function endMovement() {
    var fromTileId = this.getAttribute("data-moving-from");
    if (this.classList.contains("js-moving")) {
      this.classList.remove("js-moving");
      this.style.left = null;
      this.style.top = null;
      this.removeAttribute("data-moving-from");
      ["style", "class"].forEach(function(attr) {
        if (this.hasAttribute(attr) && this.getAttribute(attr) === "")
          this.removeAttribute(attr);
      }, this);
      $(this).trigger("jsmovingend", fromTileId);
    }
  }
  
  function startMovement() {
    var piece = this;
    var to = piece.parentNode;
    var table = to.parentNode.parentNode;
    var fromTileId = piece.getAttribute("data-moving-from");
    var from = table.querySelector("." + fromTileId);
    var prevRect = from.getBoundingClientRect();
    var currRect = to.getBoundingClientRect();
    var xOfs = prevRect.left - currRect.left;
    var yOfs = prevRect.top - currRect.top;

    piece.classList.remove("js-moving");
    if (xOfs) piece.style.left = xOfs + "px";
    if (yOfs) piece.style.top = yOfs + "px";

    // Fix for Chrome to allow transitions to work properly.
    window.getComputedStyle(piece).getPropertyValue("left");
    window.getComputedStyle(piece).getPropertyValue("top");

    piece.classList.add("js-moving");
  
    // This delay allows transitions to work properly on Firefox.
    setTimeout(function() {
      var propsLeft = [];
      var onEnd = function(event) {
        var index = propsLeft.indexOf(event.propertyName);
        if (index != -1) {
          propsLeft.splice(index, 1);
          if (propsLeft.length == 0) {
            endMovement.call(this);
            $(piece).unbind(TRANSITION_EVENTS, onEnd);
          }
        }
      };
      
      if (piece.classList.contains("js-moving")) {
        if (xOfs) {
          piece.style.left = null;
          propsLeft.push("left");
        }

        if (yOfs) {
          piece.style.top = null;
          propsLeft.push("top");
        }

        $(piece).bind(TRANSITION_EVENTS, onEnd);
      }
    }, 50);
  }
  
  Tileboard.prototype.smoothifyMovement = function() {
    var observer = new MutationObserver(function(mutations) {
      var removed = [];
      var removedParents = [];

      mutations.forEach(function(m) {
        if (m.target.nodeName !== "TD")
          return;
        if (m.removedNodes && m.removedNodes.length)
          [].slice.call(m.removedNodes).forEach(function(node) {
            removed.push(node);
            removedParents.push(m.target);
          });
        if (m.addedNodes && m.addedNodes.length) {
          [].slice.call(m.addedNodes).forEach(function(node) {
            var index = removed.indexOf(node);
            if (index != -1) {
              node.setAttribute("data-moving-from",
                                removedParents[index].tileId);
              startMovement.call(node);
            }
          });
        }
      });
    });

    observer.observe(this.table, {
      subtree: true,
      childList: true
    });

    $(this.table).find(".js-moving[data-moving-from]").each(startMovement);

    return observer;
  };
  
  $(window).on("tileboard:activate", function(event) {
    if (event.target.classList.contains("smoothify-movement")) {
      event.target.tileboard.smoothifyMovement();
    }
  });
})(Tileboard);
