import Canvas from "./canvas";
import { Direction, Rotate } from "./enums";
import Game from "./game";

(function (): void {

	const gridSize: number = 8;
	const tileSize: number = 100;

	let canvas: Canvas;
	let game: Game;
	
	function handleDOMContentLoaded(): void {
		canvas = new Canvas("viewport", tileSize * gridSize, tileSize * gridSize);
		game = new Game(tileSize, gridSize);
	};

	function handleRequestAnimationFrame(): void {
		canvas.render((context: CanvasRenderingContext2D): void => {
			game.render(context);
		});

		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	function handleKeyPress(event: KeyboardEvent): void {
		const key: string = event.code;
		switch (key) {
			case "KeyA": {
				game.moveSelection(Direction.Left);
				break;
			}
			case "KeyS": {
				game.moveSelection(Direction.Down);
				break;
			}
			case "KeyD": {
				game.moveSelection(Direction.Right);
				break;
			}
			case "KeyW": {
				game.moveSelection(Direction.Up);
				break;
			}
			case "Space": {
				game.clearTile();
				break;
			}
			case "KeyQ": {
				game.rotateBoard(Rotate.CounterClockwise);
				break;
			}
			case "KeyE": {
				game.rotateBoard(Rotate.Clockwise);
				break;
			}
			default: {
				break;
			}
		};
	};

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	window.addEventListener("keypress", handleKeyPress, false);

})();