**This is an extremely experimental, pre-alpha project. Expect confusion!**

This is a hackable game micro-framework for simple discrete, tile-based games
that is designed to invite people to learn about game design, HTML, CSS,
and/or JavaScript.

The game board is represented in HTML by a `<table>` element. Each
`<td>` is a tile on the board, and their child elements are pieces on
the board. Moving a piece from one tile to another is as simple as removing
it from one `<td>` to another; an optional **smoothify-movement** plugin
can be used to make this discrete action take on the appearance of
"moving" from one tile to another, but this effect is purely cosmetic
and accomplished through CSS transitions.

Constraints on gameplay logic are intentional. Collision detection and physics
can add lots of additional complexity to gameplay logic which can make games
built with them less accessible to understand and modify, especially 
through the means we're trying to encourage.

## Hackability

A player should be able to easily modify the game through a Web editing tool 
of their choice, whether it's one for beginners like the
[X-Ray Goggles][webxray] or more advanced tools like Firebug/Web Inspector, a 
JS console, [jsfiddle][], or a desktop text editor. More powerful tools will 
yield more extensive hackability.

This is primarily accomplished by offering both a markup API and a JS API to
game functionality. Additionally, the entire game state should be
serializable in the DOM so that at any point, the user can choose
"Save Page As..." from their browser's menu to save the state of their game.

## Notable Influences

* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
* [Tiddlywiki](http://tiddlywiki.com/)
* [Thimble Physics Hack](http://labs.toolness.com/temp/thimble-dzslides-spike/?notypekit=1#static:physics)
* [Gamestar Mechanic](http://gamestarmechanic.com/)

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License).

  [webxray]: http://www.hackasaurus.org/en-US/goggles/
  [jsfiddle]: http://jsfiddle.net/

