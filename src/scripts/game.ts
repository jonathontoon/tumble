import Canvas from "./canvas";
import Floor from "./floor";
import Snake from "./snake";

import { Direction } from "./enums";

class Game {

	private tileSize: number;
	private numberOfTiles: number;

	private canvas: Canvas;

	private floorTiles: Floor[][];
	private snake: Snake;

	private animationFrameCallback: FrameRequestCallback;
	private keyDownEventListener: EventListener;

	constructor(tileSize: number, numberOfTiles: number) {
		this.tileSize = tileSize;
		this.numberOfTiles = numberOfTiles;

		this.canvas = new Canvas("viewport", this.tileSize * this.numberOfTiles);

		this.floorTiles = [];
		for (let i = 0; i < this.numberOfTiles; i++) {
			this.floorTiles[i] = [];
			for (let j = 0; j < this.numberOfTiles; j++) {
				this.floorTiles[i][j] = new Floor(i, j, this.tileSize);
			}
		}

		this.snake = new Snake(0, 0, this.tileSize);

		this.animationFrameCallback = this.handleRequestAnimationFrame.bind(this);
		this.keyDownEventListener = this.handleKeyDown.bind(this);

		window.requestAnimationFrame(this.animationFrameCallback);
		window.addEventListener("keydown", this.keyDownEventListener, false);
	};

	static initialize(tileSize: number, numberOfTiles: number): Game {
		return new Game(tileSize, numberOfTiles);
	};

	private handleRequestAnimationFrame(): void {
		this.canvas.render((context: CanvasRenderingContext2D) => {
			this.floorTiles.forEach((floorTileColumn) => {
				floorTileColumn.forEach((tile) => {
					tile.render(context);
				});
			});
	
			this.snake.render(context);
		});

		window.requestAnimationFrame(this.animationFrameCallback);
	};

	private handleKeyDown(event: Event): void {
		const key = (event as KeyboardEvent).key;
		switch (key) {
			case "w":
				this.snake.update(Direction.Up);
				break;
			case "d":
				this.snake.update(Direction.Right);
				break;
			case "s":
				this.snake.update(Direction.Down);
				break;
			case "a":
				this.snake.update(Direction.Left);
				break;
			default:
				break;
		}
	};

};

export default Game;