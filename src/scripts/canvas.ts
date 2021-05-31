class Canvas {
	private element: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	constructor(id: string, width: number, height: number) {
		this.element = document.getElementById(id) as HTMLCanvasElement;
		this.context = this.element.getContext("2d") as CanvasRenderingContext2D;
		
		this.width = width;
		this.height = height;

		this.element.style.width = `${this.width}px`;
		this.element.style.height = `${this.height}px`;
		this.element.setAttribute("width", `${this.width}`);
		this.element.setAttribute("height", `${this.height}`);
	};

	public render(callback: { (context: CanvasRenderingContext2D): void; }): void {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.imageSmoothingEnabled = false;
		callback(this.context);
	};
};

export default Canvas;