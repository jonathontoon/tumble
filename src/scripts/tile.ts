import { Sprite } from "./enums";

class Tile {
	public id: number;
	public x: number;
	public y: number;
	public sprite: Sprite;
	private width: number;
	private height: number;
	public empty: boolean;

	private spritesheet: HTMLImageElement;

	constructor(id: number, x: number, y: number, size: number, sprite: Sprite) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.sprite = sprite;
		this.empty = false;

		this.spritesheet = new Image();
		this.spritesheet.src = "./images/spritesheet.png";
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.drawImage(this.spritesheet, this.sprite*16, 0, 16, 16, this.x * this.width, this.y * this.height, this.width, this.height);
		context.closePath();
	};
};

export default Tile;