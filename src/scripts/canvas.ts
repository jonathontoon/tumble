class Canvas {
	private element: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	constructor(id: string, size: number) {
		this.element = document.getElementById(id) as HTMLCanvasElement;
		this.context = this.element.getContext("2d") as CanvasRenderingContext2D;
		
		this.element.style.width = `${size}px`;
		this.element.style.height = `${size}px`;
		this.element.setAttribute("width", `${size}`);
		this.element.setAttribute("height", `${size}`);
		this.width = size;
		this.height = size;
	};

	public render(callback: { (context: CanvasRenderingContext2D): void; }): void {
		this.context.clearRect(0, 0, this.width, this.height);
		callback(this.context);
	};
};

export default Canvas;