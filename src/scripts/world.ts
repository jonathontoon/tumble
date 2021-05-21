import { Direction } from "./enums";
import Floor from "./floor";
import Snake from "./snake";

class World {
	private tileSize: number;
	private numberOfTiles: number;

	private floorTiles: Floor[][];
	private snake: Snake;

	protected keyDownEventListener: EventListener;

	constructor(tileSize: number, numberOfTiles: number) {
		this.tileSize = tileSize;
		this.numberOfTiles = numberOfTiles;

		this.floorTiles = this.createFloorTiles();
		this.snake = new Snake(0, 0, this.tileSize);

		this.keyDownEventListener = this.handleKeyDown.bind(this);

		window.addEventListener("keydown", this.keyDownEventListener, false);
	};

	private createFloorTiles(): Floor[][] {
		const tiles: Floor[][] = [];
		for (let i = 0; i < this.numberOfTiles; i++) {
			tiles[i] = [];
			for (let j = 0; j < this.numberOfTiles; j++) {
				tiles[i][j] = new Floor(i, j, this.tileSize);
			}
		}

		return tiles;
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
			case "ArrowUp":
				this.snake.update(Direction.Up);
				break;
			case "ArrowRight":
				this.snake.update(Direction.Right);
				break;
			case "ArrowDown":
				this.snake.update(Direction.Down);
				break;
			case "ArrowLeft":
				this.snake.update(Direction.Left);
				break;
			default:
				break;
		}
	};

	render(context: CanvasRenderingContext2D): void {
		for (let i = 0; i < this.floorTiles.length; i++) {
			for (let j = 0; j < this.floorTiles[i].length; j++) {
				this.floorTiles[i][j].render(context);
			}
		}

		this.snake.render(context);
	};
};

export default World;