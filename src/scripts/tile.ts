class Tile {
	public x: number;
	public y: number;
	public color: string;
	private width: number;
	private height: number;
	public isEmpty: boolean;
	public isSelected: boolean;

	constructor(x: number, y: number, size: number, color: string) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.color = color;
		this.isEmpty = false;
		this.isSelected = false;
	};

	public render(context: CanvasRenderingContext2D): void {
		if (!this.isEmpty) {
			context.beginPath();
			context.fillStyle = this.color;
			context.rect(this.x * this.width, this.y * this.height, this.width, this.height);
			context.fill();
			context.closePath();
		}
	};
};

export default Tile;