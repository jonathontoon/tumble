import Canvas from "./canvas";
import Game from "./game";
import { Direction, Rotate } from "./enums";

((): void => {

	const gridSize: number = 8;
	const tileSize: number = 100;

	let canvas: Canvas;
	let game: Game;
	
	const handleDOMContentLoaded = (): void => {
		canvas = new Canvas("viewport", tileSize * gridSize, tileSize * gridSize);
		game = new Game(tileSize, gridSize);
	};

	const handleRequestAnimationFrame = (): void => {
		canvas.render((context: CanvasRenderingContext2D): void => {
			game.render(context);
		});

		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	const handleKeyPress = (event: KeyboardEvent): void => {
		const key: string = event.code;
		switch (key) {
			case "KeyA": {
				game.updateSelection(Direction.Left);
				break;
			}
			case "KeyS": {
				game.updateSelection(Direction.Down);
				break;
			}
			case "KeyD": {
				game.updateSelection(Direction.Right);
				break;
			}
			case "KeyW": {
				game.updateSelection(Direction.Up);
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

	document.addEventListener("DOMContentLoaded", handleDOMContentLoaded, false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	window.addEventListener("keypress", handleKeyPress, false);

})();