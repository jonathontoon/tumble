import Canvas from "./canvas";
import Sprite from "./sprite";

import { Color, Direction } from "./enums";

class Game {

	private tileSize: number;
	private numberOfTiles: number;

	private canvas: Canvas;

	private colors: Color[];
	private blocks: Sprite[][];

	private animationFrameCallback: FrameRequestCallback;
	private keyDownEventListener: EventListener;

	constructor(tileSize: number, numberOfTiles: number) {
		this.tileSize = tileSize;
		this.numberOfTiles = numberOfTiles;

		this.canvas = new Canvas("viewport", this.tileSize * this.numberOfTiles);
		this.colors = [Color.Blue, Color.Green, Color.Red, Color.Yellow];

		this.blocks = [];
		for (let i = 0; i < this.numberOfTiles; i++) {
			this.blocks[i] = [];
			for (let j = 0; j < this.numberOfTiles; j++) {
				const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
				this.blocks[i][j] = new Sprite(i, j, this.tileSize, randomColor);
			}
		}

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
			this.blocks.forEach((column) => {
				column.forEach((block) => {
					block.render(context);
				});
			});
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