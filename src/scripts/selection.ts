import { Direction } from "./enums";

class Selection {
	public x: number;
	public y: number;
	public color: string;
	private width: number;
	private height: number;
	private lineWidth: number;

	constructor(x: number, y: number, size: number, color: string) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.color = color;
		this.lineWidth = 4;
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
		context.strokeStyle = this.color;
		context.lineWidth = this.lineWidth;
		context.rect((this.x * this.width) + this.lineWidth/2, (this.y * this.height) + this.lineWidth/2, this.width - this.lineWidth, this.height - this.lineWidth);
		context.stroke();
		context.closePath();
	};
};

export default Selection;