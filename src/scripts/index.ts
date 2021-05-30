import Canvas from "./canvas";
import Game from "./game";

(function (): void {

	const gridSize: number = 8;
	const tileSize: number = 100;

	let game: Game;
	let canvas: Canvas;

	function handleDOMContentLoaded(): void {
		game = new Game(tileSize, gridSize);
		canvas = new Canvas("viewport", tileSize * gridSize, tileSize * gridSize);
	};

	function handleRequestAnimationFrame(): void {
		canvas.render((context: CanvasRenderingContext2D): void => {
			game.render(context);
		});

		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);

})();