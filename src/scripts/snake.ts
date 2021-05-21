import { Direction } from "./enums";
import Sprite from "./sprite";

class Snake extends Sprite {
	constructor(x: number, y: number, size: number) {
		super(x, y, size, "#0000FF");
	};

	public update(direction: Direction): void {
		console.log(direction);
	};

	public render(context: CanvasRenderingContext2D): void {
		super.render(context);
	};
};

export default Snake;