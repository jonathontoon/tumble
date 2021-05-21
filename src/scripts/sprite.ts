class Sprite {
	public x: number;
	public y: number;
	
	private size: number;
	private color: string;

	constructor(x: number, y: number, size: number, color: string) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
	};

	public render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.fillStyle = this.color;
		context.rect(this.x * this.size, this.y * this.size, this.size, this.size);
		context.fill();
		context.closePath();
	};
};

export default Sprite;