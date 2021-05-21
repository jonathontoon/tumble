import { Color } from "./enums";

class Sprite {
	public row: number;
	public column: number;
	
	private size: number;
	private color: Color;

	constructor(row: number, column: number, size: number, color: Color) {
		this.row = row;
		this.column = column;
		this.size = size;
		this.color = color;
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.fillStyle = this.color;
		context.rect(this.row * this.size, this.column * this.size, this.size, this.size);
		context.fill();
		context.closePath();
	};
};

export default Sprite;