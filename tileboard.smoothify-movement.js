(function(Tileboard) {
  var MutationObserver = (window.MutationObserver ||
                          window.WebKitMutationObserver ||
                          window.MozMutationObserver);

  function endMovement() {
    if (this.classList.contains("js-moving")) {
      this.classList.remove("js-moving");
      this.style.left = null;
      this.style.top = null;
      ["style", "class"].forEach(function(attr) {
        if (this.hasAttribute(attr) && this.getAttribute(attr) === "")
          this.removeAttribute(attr);
      }, this);
    }
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
            endMovement.call(node);
            removed.push(node);
            removedParents.push(m.target);
          });
        if (m.addedNodes && m.addedNodes.length) {
          [].slice.call(m.addedNodes).forEach(function(node) {
            var index = removed.indexOf(node);
            if (index != -1) {
              var prevRect = removedParents[index].getBoundingClientRect();
              var currRect = m.target.getBoundingClientRect();
              node.style.left = (prevRect.left - currRect.left) + "px";
              node.style.top = (prevRect.top - currRect.top) + "px";

              // Fix for Chrome to allow transitions to work properly.
              window.getComputedStyle(node).getPropertyValue("left");
              window.getComputedStyle(node).getPropertyValue("top");

              node.classList.add("js-moving");
            
              // This delay allows transitions to work properly on Firefox.
              setTimeout(function() {
                if (node.classList.contains("js-moving")) {
                  node.style.left = null;
                  node.style.top = null;
                  node.addEventListener("transitionend", endMovement);
                  node.addEventListener("webkitTransitionEnd", endMovement);
                }
              }, 50);
            }
          });
        }
      });
    });

    observer.observe(this.table, {
      subtree: true,
      childList: true
    });
  
    return observer;
  };
})(Tileboard);
