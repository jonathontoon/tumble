import { Color } from "./enums";

class Tile {
	public x: number;
	public y: number;
	public color: Color;
	private width: number;
	private height: number;
	public empty: boolean;

	private spritesheet: HTMLImageElement;

	constructor(x: number, y: number, size: number, color: Color) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.color = color;
		this.empty = false;

		this.spritesheet = new Image();
		this.spritesheet.src = "./images/spritesheet.png";
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.drawImage(this.spritesheet, this.color*16, 0, 16, 16, this.x * this.width, this.y * this.height, this.width, this.height);
		// context.fillStyle = this.color;
		// context.rect(this.x * this.width, this.y * this.height, this.width, this.height);
		// context.fill();
		context.closePath();
	};
};

export default Tile;