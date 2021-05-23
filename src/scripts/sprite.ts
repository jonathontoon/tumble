class Sprite {
	public row: number;
	public column: number;
	public color: string;
	public isEmpty: boolean;
	public isSelected: boolean;
	private size: number;

	constructor(row: number, column: number, size: number, color: string) {
		this.row = row;
		this.column = column;
		this.color = color;
		this.isEmpty = false;
		this.size = size;
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		
		if (this.isEmpty) {
			context.fillStyle = "black";
		} else {
			context.fillStyle = this.color;
		}

		context.rect(this.row * this.size, this.column * this.size, this.size, this.size);
		context.fill();
		context.closePath();
	};
};

export default Sprite;