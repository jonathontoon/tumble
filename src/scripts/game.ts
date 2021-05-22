import Canvas from "./canvas";
import Board from "./board";

class Game {
	private canvas: Canvas;
	private board: Board;

	private animationFrameCallback: FrameRequestCallback;

	constructor(tileSize: number, numberOfTiles: number) {
		this.canvas = new Canvas("viewport", tileSize * numberOfTiles);
		this.board = new Board(tileSize, numberOfTiles);

		this.animationFrameCallback = this.handleRequestAnimationFrame.bind(this);
		window.requestAnimationFrame(this.animationFrameCallback);
	};

	static initialize(tileSize: number, numberOfTiles: number): Game {
		return new Game(tileSize, numberOfTiles);
	};

	private handleRequestAnimationFrame(): void {
		this.canvas.render((context: CanvasRenderingContext2D) => {
			this.board.render(context);
		});

		window.requestAnimationFrame(this.animationFrameCallback);
	};
};

export default Game;