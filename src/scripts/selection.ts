import { Sprite, Direction } from "./enums";

class Selection {
	public x: number;
	public y: number;
	public sprite: Sprite;
	private width: number;
	private height: number;

	private spritesheet: HTMLImageElement;

	constructor(x: number, y: number, size: number, sprite: Sprite) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;

		this.sprite = sprite;

		this.spritesheet = new Image();
		this.spritesheet.src = "./images/spritesheet.png";
	};

	public move(direction: Direction): void {
		switch (direction) {
			case Direction.Up: {
				this.y -= 1;
				break;
			}
			case Direction.Down: {
				this.y += 1;
				break;
			}
			case Direction.Left: {
				this.x -= 1;
				break;
			}
			case Direction.Right: {
				this.x += 1;
				break;
			}
		}
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.drawImage(this.spritesheet, this.sprite*16, 0, 16, 16, this.x * this.width, this.y * this.height, this.width, this.height);
		context.closePath();
	};
};

export default Selection;